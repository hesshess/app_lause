import { ApplauseCard } from "~/features/components/applause-card";
import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function loader(_args: Route.LoaderArgs) {
    return {};
}

export function action(_args: Route.ActionArgs) {
    return {};
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboard | app_lause" },
        { name: "description", content: "Top applauses leaderBoard" },
    ];
};

export default function LeaderBoardPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Leaderboards"
                description="The most applauded on app-lause"
            />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight  tracking-tight">Daily Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most applauded good deeds by day.</p>
                </div>
                {Array.from({length:7}).map((_,index) =>(<ApplauseCard
            key={`applause-${index}`}
            id={`applause-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}  
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/applauses/leaderboards/daily">Explore all applauses &rarr;</Link>
                    </Button>      
            </div>
                        <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight  tracking-tight">Weekly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most applauded good deeds by week.</p>
                </div>
                {Array.from({length:7}).map((_,index) =>(<ApplauseCard
            key={`applause-${index}`}
            id={`applause-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}  
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/applauses/leaderboards/weekly">Explore all applauses &rarr;</Link>
                    </Button>      
            </div>
                        <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight  tracking-tight">Monthly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most applauded good deeds by month.</p>
                </div>
                {Array.from({length:7}).map((_,index) =>(<ApplauseCard
            key={`applause-${index}`}
            id={`applause-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}  
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/applauses/leaderboards/monthly">Explore all applauses &rarr;</Link>
                    </Button>      
            </div>
                        <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight  tracking-tight">Yearly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most applauded good deeds by year.</p>
                </div>
                {Array.from({length:7}).map((_,index) =>(<ApplauseCard
            key={`applause-${index}`}
            id={`applause-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}  
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/applauses/leaderboards/yearly">Explore all applauses &rarr;</Link>
                    </Button>      
            </div>
        </div>
    );
}
