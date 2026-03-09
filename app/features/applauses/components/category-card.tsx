import { Link } from "react-router";
import { ChevronRightIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";

interface CategoryCardProps {
    id: string;
    name: string;
    description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
    return (
        <Link to={`/applauses/categories/${id}`} className="block">
            <Card>
                <CardHeader>
                    <CardTitle className="flex">
                        {name} <ChevronRightIcon className="size-6" />
                    </CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}
