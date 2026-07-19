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
      <Card className="relative flex w-full flex-row items-center justify-between bg-transparent hover:bg-card/50">
        <Link
          to={`/applauses/${id}`}
          aria-label={`View applause: ${name}`}
          className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <MessageCircleIcon className="h-4 w-4" />
              <span>{praisesCount}</span>
            </div>
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="relative z-10 py-0">
          <Button
            onClick={absorbClick}
            variant="outline"
            className={cn(
              "flex h-14 flex-col",
              optimisticIsUpvoted ? "border-primary text-primary" : "",
            )}
          >
            <ChevronUpIcon className="size-4 shrink-0" />
            <span className="sr-only">Upvote applause. Current votes:</span>
            <span>{optimisticVotesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    );
}
