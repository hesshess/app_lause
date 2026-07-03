import { Link, useFetcher } from "react-router";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface ApplauseCardProps {
    id: number | string;
    name: string;
    description: string;
    praisesCount: string;
    viewsCount: string;
    votesCount: string;
    isUpvoted?: boolean;
}

export function ApplauseCard({
    id,
    name,
    description,
    praisesCount,
    viewsCount,
    votesCount,
    isUpvoted = false,
}: ApplauseCardProps) {
    const fetcher = useFetcher();
    const numericVotesCount = Number(votesCount ?? 0);
    const isSubmitting = fetcher.state === "submitting";
    const optimisticIsUpvoted =
      isSubmitting ? !isUpvoted : isUpvoted;
    const optimisticVotesCount =
      isSubmitting
        ? (isUpvoted ? numericVotesCount - 1 : numericVotesCount + 1)
        : numericVotesCount;
    const absorbClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      fetcher.submit(null, {
        method: "POST",
        action: `/applauses/${id}/upvote`,
      });
    };
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
                    <Button
                      onClick={absorbClick}
                      variant="outline"
                      className={cn(
                        "flex flex-col h-14",
                        optimisticIsUpvoted ? "border-primary text-primary" : "",
                      )}
                    >
                        <ChevronUpIcon className="size-4 shrink-0" />
                        <span>{optimisticVotesCount}</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
