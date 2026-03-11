import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { ApplauseCard } from "~/features/components/applause-card";
import ApplausePagination from "~/common/components/applause-pagination";
import { Input } from "~/common/components/ui/input";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";

export function meta (_args:Route.MetaFunction) {
    return [
        {title: "Search Applauses | app_lause"},
        {name: "description", content: "Search for Applauses"},
    ]
}

const paramsSchema = z.object({
    query: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),

})

export function loader({request}: Route.LoaderArgs) {
    const url = new URL(request.url);
    const {success, data: parsedData} = paramsSchema.safeParse(
        Object.fromEntries(url.searchParams)
    );
    if(!success){
        throw new Error("Invalid params");
    }
}




export default function SearchPage(_props: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero title="Search" description="Search for applause by title or description"/>
            <Form className="flex justify-center max-w-2xl items-center gap-2 mx-auto">
                <Input name="query" placeholder="Search for applauses" className="text-lg"/>
                <Button type="submit">Search</Button>
            </Form>
            <div className="space-y-5 w-full max-w-3xl mx-auto">
            {Array.from({length:11}).map((_,index) =>(
                <ApplauseCard
                key={`applause-${index}`}
                id={`applause-${index}`}
                title="asdf"
                description="asdf"
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
