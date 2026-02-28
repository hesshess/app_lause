import { Link } from "react-router";

import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";

interface DonaCardProps {
    id: string;
    organizationLogoSrc: string;
    organizationName: string;
    postedAt: string;
    title: string;
    tags: string[];
    amountLabel: string;
    locationLabel: string;
    donateButtonLabel: string;
}

export function DonaCard({
    id,
    organizationLogoSrc,
    organizationName,
    postedAt,
    title,
    tags,
    amountLabel,
    locationLabel,
    donateButtonLabel,
}: DonaCardProps) {
    return (
        <Link to={`/donations/${id}`}>
            <Card className="bg-transparent transition-colors hover:bg-card/50">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={organizationLogoSrc}
                            alt="Organization Logo"
                            className="size-10 rounded-full"
                        />
                        <div className="space-x-2">
                            <span className="text-accent-foreground">{organizationName}</span>
                            <span className="text-xs text-muted-foreground">{postedAt}</span>
                        </div>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            {amountLabel}
                        </span>
                        <span className="text-sm fint-medium text-muted-foreground">
                            {locationLabel}
                        </span>
                    </div>
                    <Button variant="secondary" size="sm">
                        {donateButtonLabel}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
