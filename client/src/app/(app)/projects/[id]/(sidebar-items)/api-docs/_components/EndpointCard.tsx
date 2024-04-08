import AnimateCard from "@/components/animated/AnimateCard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IEndpoint } from "@/types/database";
import Link from "next/link";
import React from "react";

export default function EndpointCard({
    point,
    replace = false,
}: {
    point: IEndpoint;
    replace?: boolean;
}) {
    return (
        <AnimateCard type="subtle">
            <Link href={`${replace ? "" : "api-docs/"}${point.id}`}>
                <Card key={point.id} className="flex">
                    <div className="flex min-w-20 rounded-l-lg border-r bg-muted px-3">
                        <p className="my-auto">{point.method}</p>
                    </div>
                    <div className="mx-4 my-2 flex flex-col gap-0">
                        {point.name}
                        <Label>{point.route}</Label>
                    </div>
                </Card>
            </Link>
        </AnimateCard>
    );
}
