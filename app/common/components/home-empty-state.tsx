import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

interface HomeEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
}

export function HomeEmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  className,
}: HomeEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-52 flex-col items-start justify-center rounded-2xl border border-dashed bg-muted/20 p-8 md:col-span-1 xl:col-span-2",
        className,
      )}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-lg leading-7 text-muted-foreground">
        {description}
      </p>
      {actionLabel && actionTo ? (
        <Button asChild variant="outline" className="mt-5">
          <Link to={actionTo}>
            {actionLabel}
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
