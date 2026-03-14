import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { HeartIcon } from "lucide-react";

interface PraiseCardProps {
  avatarSrc: string;
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
          <AvatarImage src={avatarSrc} />
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
      <span className="text-xs text-muted-foreground">{postedAt}</span>
    </div>
  );
}
