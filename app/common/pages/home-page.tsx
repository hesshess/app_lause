import { Link, type MetaFunction } from "react-router";

import { ApplauseCard } from "~/features/components/applause-card";
import { PostCard } from "~/features/community/components/post-card";
import { DonaCard } from "~/features/donations/components/dona-card";
import { GroupCard } from "~/features/groups/components/group-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
    return[
        {title: "Home | app_lause"},
        {name: "description", content: "Welcome to app_lause"},
    ]
}

export const loader = () => {
    return {

    }
}

export default function HomePage() {
    return (
        <div className="px-20 space-y-40">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">Today's Applauses</h2>
                    <p className="text-xl font-light text-foreground">Top applauded good deeds of today.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/applauses/leaderboards">Explore all allpauses &rarr;</Link>
                    </Button>
                </div>
                    {Array.from({length:11}).map((_,index) =>(<ApplauseCard
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
            key={`communityId-${index}`}
            id={`communityId-${index}`}
                        title="What is the best pogging spot?"
                        author="Hess"
                        avatarSrc="https://github.com/apple.png"
                        category="Plogging"
                        postedAt="12 hours ago"
                    />
                    ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">IdeasGPT</h2>
                    <p className="text-xl font-light text-foreground">Find ideas for your next applause</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/ideas">Explore all ideas &rarr;</Link>
                    </Button>
                </div>
                    {Array.from({length:10}).map((_,index)=>(                
                        <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
                        title="Start a monthly “Cook & Care” initiative where neighbors prepare extra home-cooked meals together at a local community center and deliver them to elderly residents living alone. Volunteers can sign up for cooking, packaging, or delivery roles. Along with each meal, include a handwritten note of encouragement."
                        viewsCount={123}
                        postedAt="12 hours ago"
                        likesCount={12}
                        claimed={index % 2 === 0}
                        />
                        ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                    <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">Latest Donations</h2>
                    <p className="text-xl font-light text-foreground">Find the place where your love to be</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/donations">Explore all donations &rarr;</Link>
                    </Button>
                    </div>
                    {Array.from({length:11}).map((_,index)=>(                    <DonaCard
            key={`donaId-${index}`}
            id={`donaId-${index}`}
                        organizationLogoSrc="https://github.com/unicef.png"
                        organizationName="Unicef"
                        postedAt="11 hours ago"
                        title="Support Children in Crisis"
                        tags={["Regular Donation", "Singular Donation"]}
                        amountLabel="$10 / month"
                        locationLabel="Gaza Strip, Palestine"
                        donateButtonLabel="Donate now"
                    />))}
                    
            </div>
            <div className="grid grid-cols-4 gap-4">
                    <div>
                    <h2 className="text-5xl font-bold leading-tight  tracking-tight">Find a group</h2>
                    <p className="text-xl font-light text-foreground">Join groups to do good together</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/groups">Explore all groups &rarr;</Link>
                    </Button>
                    </div>
                        {Array.from({length:7}).map((_,index)=>(
                        <GroupCard
            key={`groupId-${index}`}
            id={`groupId-${index}`}
                        leaderUsername="bess"
                        leaderAvatarSrc="https://github.com/hesshess.png"
                        categories={["Seoul","Education","Mentoring"]}
                        outro="your talent to the children."
                        buttonLabel="Join group"
                    />   
                        ))}
                    
            </div>
        </div>
    );
}
