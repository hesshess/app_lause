import { ChevronUpIcon, DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link, useFetcher } from "react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface PostCardProps {
  id: number;
  avatarSrc: string | null;
  title: string;
  author: string;
  category: string;
  postedAt: string;
  expanded?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  id,
  avatarSrc,
  title,
  author,
  category,
  postedAt,
  expanded = false,
  votesCount = 0,
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  const optimisitcVotesCount =
    fetcher.state === "idle"
      ? votesCount
      : isUpvoted
        ? votesCount - 1
        : votesCount + 1;
  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${id}/upvote`,
    });
  };
  return (
    <Card
      className={cn(
        "relative bg-transparent transition-colors hover:bg-card/50",
        expanded ? "flex flex-row items-center justify-between" : "",
      )}
    >
      <Link
        to={`/community/${id}`}
        aria-label={`View discussion: ${title}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <CardHeader className="pointer-events-none flex w-full min-w-0 flex-row items-center gap-2">
        <Avatar className="size-14">
          <AvatarFallback>{author}</AvatarFallback>
          <AvatarImage src={avatarSrc ?? undefined} alt="" />
        </Avatar>
        <div className="min-w-0 space-y-2">
          <CardTitle className="break-words">{title}</CardTitle>
          <div className="flex flex-wrap gap-2 text-sm leading-tight text-muted-foreground">
            <span>
              {author} on {category}
            </span>
            <DotIcon className="w-4 h-4" />
            <span>{DateTime.fromISO(postedAt).toRelative()}</span>
          </div>
        </div>
      </CardHeader>
      {!expanded && (
        <CardFooter className="pointer-events-none flex justify-end">
          <span className={buttonVariants({ variant: "link" })}>
            Reply &rarr;
          </span>
        </CardFooter>
      )}
      {expanded && (
        <CardFooter className="relative z-10 flex justify-end pb-0">
          <Button
            onClick={absorbClick}
            variant="outline"
            className={cn(
              "flex h-14 flex-col",
              optimisitcIsUpvoted ? "border-primary text-primary" : "",
            )}
          >
            <ChevronUpIcon className="size-4 shrink-0" />
            <span className="sr-only">Upvote discussion. Current votes:</span>
            <span>{optimisitcVotesCount}</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
