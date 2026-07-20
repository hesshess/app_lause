import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { HomeEmptyState } from "./home-empty-state";

describe("HomeEmptyState", () => {
  it("renders its heading, description, and action as an accessible link", () => {
    render(
      <MemoryRouter>
        <HomeEmptyState
          title="No discussions yet"
          description="Start the first conversation."
          actionLabel="Start a discussion"
          actionTo="/community/submit"
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "No discussions yet" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Start the first conversation.")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Start a discussion" }),
    ).toHaveAttribute("href", "/community/submit");
  });

  it("does not render an incomplete action", () => {
    render(
      <MemoryRouter>
        <HomeEmptyState
          title="New ideas are on the way"
          description="Check back soon."
          actionLabel="Explore ideas"
        />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
