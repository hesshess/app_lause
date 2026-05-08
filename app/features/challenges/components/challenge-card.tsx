import { DateTime } from "luxon";
import { Link } from "react-router";

import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface ChallengeCardProps {
  id: number;
  thumbnailSrc: string;
  hostName: string;
  postedAt: string;
  title: string;
  challengeTypeLabel?: string;
  participationLabel?: string;
  tags: string[];
  durationLabel: string;
  locationLabel: string;
}

export function ChallengeCard({
  id,
  thumbnailSrc,
  hostName,
  postedAt,
  title,
  challengeTypeLabel,
  participationLabel,
  tags,
  durationLabel,
  locationLabel,
}: ChallengeCardProps) {
  const displayChallengeType = challengeTypeLabel ?? tags[0] ?? "Challenge";
  const displayParticipation = participationLabel ?? tags[1] ?? "Open";

  return (
    <Link to={`/challenges/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={thumbnailSrc}
              alt={`${title} cover`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{hostName}</span>
              <span className="text-xs text-muted-foreground">
                {DateTime.fromISO(postedAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {displayChallengeType}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {displayParticipation}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {durationLabel}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="capitalize">
              {locationLabel}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
                      <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {durationLabel}
            </span>

            <span className="text-sm font-medium text-muted-foreground">
              {locationLabel}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Join Challenge
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
