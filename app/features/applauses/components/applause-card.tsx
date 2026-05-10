import { Link } from "react-router";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";

interface ApplauseCardProps {
    id: number | string;
    name: string;
    description: string;
    praisesCount: string;
    viewsCount: string;
    votesCount: string;
}

export function ApplauseCard({
    id,
    name,
    description,
    praisesCount,
    viewsCount,
    votesCount,
}: ApplauseCardProps) {
    return (
        <Link to={`/applauses/${id}`} className="block">
            <Card className="w-full flex flex-row items-center justify-between bg-transparent hover:bg-card/50">
                <CardHeader className="w-full">
                    <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {description}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>{praisesCount}</span>
                        </div>
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <EyeIcon className="w-4 h-4" />
                            <span>{viewsCount}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="py-0">
                    <Button variant="outline" className="flex flex-col h-14">
                        <ChevronUpIcon className="size-4 shrink-0" />
                        <span>{votesCount}</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
