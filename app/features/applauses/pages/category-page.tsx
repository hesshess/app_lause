import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ApplauseCard } from "~/features/components/applause-card";
import ApplausePagination from "~/common/components/applause-pagination";


export const meta = ({params}: Route.MetaArgs) => {
    return [
        // { title: `${params.category} | app_lause` },
        // { name: "description", content: `Browse ${params.category} applauses` },
        { title: `Plogging | app_lause` },
        { name: "description", content: `Browse Plogging Applauses` },
    ];
};

export default function CategoryPage() {
    return (
        <div className="space-y-10">
            <Hero
             title="Plogging" description="Activity of picking up litter while jogging"/>
            <div className="space-y-5 w-full max-w-3xl mx-auto">
            {Array.from({length:11}).map((_,index) =>(
                <ApplauseCard
                key={`applauseId-${index}`}
                id={`applauseId-${index}`}
                title="Plogging"
                description="Plogging in Seoul"
                commentsCount={12}
                viewsCount={12}
                applauseCount={120}
            />
            ))}   
            </div>
            <ApplausePagination totalPages={10}/>
        </div>
    );
}
