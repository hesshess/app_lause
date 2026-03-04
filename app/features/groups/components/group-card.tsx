import { Link } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";

interface GroupCardProps {
    id: string;
    leaderUsername: string;
    leaderAvatarSrc: string;
    categories: string[];
    outro: string;
    buttonLabel: string;
}

export function GroupCard({
    id,
    leaderUsername,
    leaderAvatarSrc,
    categories,
    outro,
    buttonLabel,
}: GroupCardProps) {
    return (
        <Link to={`/groups/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-colors">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-base leading-loose">
                        <Badge variant="secondary" className="inline-flex shadow-sm items-center text-base">
                            <span>@{leaderUsername}</span>
                            <Avatar className="size-5">
                                <AvatarFallback>{leaderUsername[0]}</AvatarFallback>
                                <AvatarImage src={leaderAvatarSrc} />
                            </Avatar>
                        </Badge>
                        <span>is looking for</span>
                    {categories.map((category, index) => (
                    <Badge key={index} className="text-base">
                        {category}
                    </Badge>
                    ))}
                        <span>to volunteer</span>
                        <span>{outro}</span>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="justify-end">
                    <Button variant="link">{buttonLabel} &rarr;</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
