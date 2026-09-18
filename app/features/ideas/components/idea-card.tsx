import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link, useFetcher } from "react-router";
import type { action } from "../pages/ideas-page";

import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface IdeaCardProps {
  id: number;
  title: string;
  viewsCount?: number;
  postedAt?: string;
  likesCount?: number;
  owner?: boolean;
  claimed?: boolean;
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  postedAt,
  likesCount,
  claimed,
  owner,
}: IdeaCardProps) {
  const fetcher = useFetcher<typeof action>();
  const isPending = fetcher.state !== "idle";
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">
          {owner ? (
            <span>{title}</span>
          ) : claimed ? (
            <span className="text-muted-foreground">
              This idea has been claimed.
            </span>
          ) : (
            <Link to={`/ideas/${id}`}>{title}</Link>
          )}
        </CardTitle>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{viewsCount}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          {postedAt ? (
            <span>{DateTime.fromISO(postedAt).toRelative()}</span>
          ) : null}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <fetcher.Form method="post" action="/ideas?index">
              <input type="hidden" name="ideaId" value={id} />
              <Button variant="outline" type="submit" disabled={isPending} aria-busy={isPending}>
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like idea. Current likes:</span>
                <span>{likesCount ?? 0}</span>
              </Button>
              {!isPending && fetcher.data?.error ? (
                <p role="alert" className="text-sm text-red-500">{fetcher.data.error}</p>
              ) : null}
            </fetcher.Form>
            <Button asChild>
              <Link to={`/ideas/${id}`}>Claim idea now &rarr;</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" disabled className="cursor-not-allowed">
            <LockIcon className="size-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
