import { Link, type MetaFunction } from "react-router";

import { ApplauseCard } from "~/features/appluases/components/applause-card";
import { PostCard } from "~/features/community/components/post-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
    return[
        {title: "Home | app_lause"},
        {name: "description", content: "Welcome to app_lause"},
    ]
}

export default function HomePage() {
    return (
        <div className="px-20 space-y-20">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">Today's Applauses</h2>
                    <p className="text-xl font-light text-foreground">Top applauded good deeds of today.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/applauses/leaderboards">Explore all allpauses &rarr;</Link>
                    </Button>
                </div>
                
                    {Array.from({length:11}).map((_,index) =>(<ApplauseCard
                        id={`applauseId-${index}`}
                        title="asdf"
                        description="asdf"
                        commentsCount={12}
                        viewsCount={12}
                        applauseCount={120}
                    />
                    ))}
                
            </div>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">Latest Discussions</h2>
                    <p className="text-xl font-light text-foreground">Latest discussions from our community. </p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/community">Explore all allpauses &rarr;</Link>
                    </Button>
                </div>
                    {Array.from({length:10}).map((_,index)=>(
                    <PostCard
                        id="/community/postId"
                        title="What is the best pogging spot?"
                        author="Hess"
                        avatarSrc="https://github.com/apple.png"
                        category="Plogging"
                        postedAt="12 hours ago"
                    />
                    ))}
            </div>
        </div>
    );
}
