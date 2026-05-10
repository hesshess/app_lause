import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ApplauseCard } from "~/features/applauses/components/applause-card";
import ApplausePagination from "~/common/components/applause-pagination";
import z from "zod";
import {
  getApplausesByCategory,
  getCategory,
  getCategoryPages,
} from "../queries";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    // { title: `${params.category} | app_lause` },
    // { name: "description", content: `Browse ${params.category} applauses` },
    { title: `Plogging | app_lause` },
    { name: "description", content: `Browse Plogging Applauses` },
  ];
};

const paramsSchema = z.object({
  category: z.coerce.number(),
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid category", { status: 400 });
  }
  const [category, applauses, totalPages] = await Promise.all([
    getCategory(data.category),
    getApplausesByCategory({ categoryId: data.category, page: data.page }),
    getCategoryPages(data.category),
  ]);
  return { category, applauses, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        description={loaderData.category.description}
      />
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
