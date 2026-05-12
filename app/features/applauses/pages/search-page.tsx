import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { ApplauseCard } from "~/features/applauses/components/applause-card";
import ApplausePagination from "~/common/components/applause-pagination";
import { Input } from "~/common/components/ui/input";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { getApplausesBySearch, getPagesBySearch } from "../queries";
import { makeSSRClient } from "~/supa-client";

export function meta(_args: Route.MetaFunction) {
  return [
    { title: "Search Applauses | app_lause" },
    { name: "description", content: "Search for Applauses" },
  ];
}

const searchParams = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParams.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid params");
  }
    if (parsedData.query === "") {
    return { applauses: [], totalPages: 1 };
  }
  const applauses = await getApplausesBySearch(client, {
    query: parsedData.query,
    page: parsedData.page,
  });
  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query,
  });
  return { applauses, totalPages };
}
export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Search"
        description="Search for applause by title or description"
      />
      <Form className="flex justify-center max-w-2xl items-center gap-2 mx-auto">
        <Input
          name="query"
          placeholder="Search for applauses"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-3xl mx-auto">
         {loaderData.applauses.map((applause) => (
          <ApplauseCard
         key={applause.applause_id}
            id={applause.applause_id}
            name={applause.name}
            description={applause.tagline}
            praisesCount={applause.praises}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
      </div>
      <ApplausePagination totalPages={loaderData.totalPages} />
    </div>
  );
}
