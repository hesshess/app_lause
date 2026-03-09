import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "~/features/applauses/components/category-card";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "categories page | app_lause" },
        { name: "description", content: "categories page" },
    ];
};

export default function CategoriesPage(_props: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero title="Categories" description="Browse applauses by category"/>
            <div className="grid grid-cols-4 gap-10">
                {Array.from({length:10}).map((_, index)=>(
                    <CategoryCard
                    key={`categoryId-${index}`}
                    id={`categoryId-${index}`}
                    name="Category Name"
                    description="Category Description"
                />
                ))}
            </div>
        </div>
    );
}
