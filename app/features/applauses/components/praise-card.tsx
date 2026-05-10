import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { HeartIcon } from "lucide-react";
import { DateTime } from "luxon";

interface PraiseCardProps {
  avatarSrc: string | null;
  handle: string;
  username: string;
  rating: number;
  content: string;
  postedAt: string;
}

export function PraiseCard({
  avatarSrc,
  handle,
  username,
  rating,
  content,
  postedAt,
}: PraiseCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{username}</AvatarFallback>
          {avatarSrc ? <AvatarImage src={avatarSrc} /> : null}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{handle}</h4>
          <p className="text-sm text-muted-foreground">{username}</p>
        </div>
      </div>
      <div className="flex text-violet-400">
        {Array.from({ length: rating }).map((_, index) => (
          <HeartIcon key={index} className="size-4" fill="currentColor" />
        ))}
      </div>
      <p className="text-muted-foreground">{content}</p>
        <span className="text-xs text-muted-foreground">
        {DateTime.fromISO(postedAt).toRelative()}
      </span>
    </div>
  );
}
