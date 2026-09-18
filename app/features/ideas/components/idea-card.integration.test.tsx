import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, useMatches } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ makeSSRClient: vi.fn() }));
vi.mock("~/supa-client", () => ({ makeSSRClient: mocks.makeSSRClient }));

import { IdeaCard } from "./idea-card";
import { action } from "../pages/ideas-page";

const sessionCookie = "session=test; Path=/";
let liked: boolean;
let signedIn: boolean;
let failWrite: boolean;
let finishInsert: (() => void) | undefined;
let waitForInsert: Promise<void> | undefined;
let writes: number;

function CardPage() {
  const matches = useMatches();
  const { likes } = matches[matches.length - 1].data as { likes: number };
  return <IdeaCard id={7} title="Daily reflection" likesCount={likes} />;
}

function renderCard(path = "/ideas") {
  const router = createMemoryRouter([
    { path: "/", loader: () => ({ likes: Number(liked) }), Component: CardPage, HydrateFallback: () => null },
    {
      path: "/ideas",
      children: [{
        index: true,
        loader: () => ({ likes: Number(liked) }),
        action: (args) => action(args as Parameters<typeof action>[0]),
        Component: CardPage,
        HydrateFallback: () => null,
      }],
    },
    { path: "/auth/login", element: <p>Login required</p> },
  ], { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

describe("IdeaCard likes", () => {
  beforeEach(() => {
    liked = false;
    signedIn = true;
    failWrite = false;
    writes = 0;
    waitForInsert = undefined;
    finishInsert = undefined;
    mocks.makeSSRClient.mockImplementation(() => ({
      headers: new Headers({ "Set-Cookie": sessionCookie }),
      client: {
        auth: { getUser: async () => ({ data: { user: signedIn ? { id: "user-1" } : null }, error: null }) },
        from: (table: string) => {
          expect(table).toBe("idea_likes");
          let deleting = false;
          const filters: Record<string, unknown> = {};
          const query = {
            select: () => query,
            eq: (key: string, value: unknown) => { filters[key] = value; return query; },
            maybeSingle: async () => {
              expect(filters).toEqual({ idea_id: 7, profile_id: "user-1" });
              return { data: liked ? { idea_id: 7 } : null, error: null };
            },
            delete: () => { deleting = true; return query; },
            single: async () => {
              expect(deleting).toBe(true);
              expect(filters).toEqual({ idea_id: 7, profile_id: "user-1" });
              writes++;
              if (!failWrite) liked = false;
              return { error: failWrite ? new Error("Write failed") : null };
            },
            insert: async (row: unknown) => {
              expect(row).toEqual({ idea_id: 7, profile_id: "user-1" });
              writes++;
              await waitForInsert;
              if (!failWrite) liked = true;
              return { error: failWrite ? new Error("Write failed") : null };
            },
          };
          return query;
        },
      },
    }));
  });

  it.each(["/ideas", "/"])("updates and persists the count after like/unlike from %s", async (path) => {
    const router = renderCard(path);
    fireEvent.click(await screen.findByRole("button", { name: /Current likes:\s*0/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /Current likes:\s*1/ })).toBeEnabled());
    await act(() => router.revalidate());
    expect(screen.getByRole("button", { name: /Current likes:\s*1/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Current likes:\s*1/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /Current likes:\s*0/ })).toBeEnabled());
    expect(writes).toBe(2);
  });

  it("disables the button while the write is pending", async () => {
    waitForInsert = new Promise<void>((resolve) => { finishInsert = resolve; });
    renderCard();
    const button = await screen.findByRole("button", { name: /Current likes:\s*0/ });
    fireEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    fireEvent.click(button);
    expect(writes).toBe(1);
    finishInsert!();
    await waitFor(() => expect(screen.getByRole("button", { name: /Current likes:\s*1/ })).toBeEnabled());
  });

  it("redirects signed-out users without writing a like", async () => {
    signedIn = false;
    renderCard();
    fireEvent.click(await screen.findByRole("button", { name: /Current likes:\s*0/ }));
    expect(await screen.findByText("Login required")).toBeInTheDocument();
    expect(writes).toBe(0);
  });

  it("shows a write error without increasing the count", async () => {
    failWrite = true;
    renderCard();
    fireEvent.click(await screen.findByRole("button", { name: /Current likes:\s*0/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Could not update your like");
    expect(screen.getByRole("button", { name: /Current likes:\s*0/ })).toBeEnabled();
  });

  it("rejects invalid IDs before writing and forwards session headers on success", async () => {
    for (const ideaId of ["", "-1", "abc"]) {
      const result = await action({ request: new Request("https://example.com/ideas?index", {
        method: "POST", body: new URLSearchParams({ ideaId }),
      }) } as Parameters<typeof action>[0]);
      expect(result).toMatchObject({ init: { status: 400 } });
    }
    expect(writes).toBe(0);
    const result = await action({ request: new Request("https://example.com/ideas?index", {
      method: "POST", body: new URLSearchParams({ ideaId: "7", profile_id: "someone-else" }),
    }) } as Parameters<typeof action>[0]);
    expect(result).toMatchObject({ data: { error: null } });
    if (result instanceof Response) throw new Error("Unexpected redirect");
    expect(new Headers(result.init?.headers).get("Set-Cookie")).toBe(sessionCookie);
  });
});
