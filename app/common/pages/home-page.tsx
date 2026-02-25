import type { MetaFunction } from "react-router";

import { ApplauseCard } from "~/features/appluases/components/applause-card";

export const meta: MetaFunction = () => {
    return[
        {title: "Home | app_lause"},
        {name: "description", content: "Welcome to app_lause"},
    ]
}

export default function HomePage() {
    return (
        <div className="px-20">
            <div className="grid grid-cols-3 gap-4 ">
                <div>
                    <h2 className="text-5xl font-bold leading-normal  tracking-tight">Today's Applauses</h2>
                    <p className="text-xl font-light text-foreground">Top applauded good deeds of today.</p>
                </div>
                
                    {Array.from({length:10}).map((_,index) =>(<ApplauseCard
                        applauseId={`productId-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}
                
            </div>
        </div>
    );
}
