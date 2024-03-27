import CustomLink from "@/components/custom/CustomLink";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IEndpoint } from "@/types/database";
import React from "react";

export default function EndpointCard({ point }: { point: IEndpoint }) {
    return (
        <Card key={point.id} className="flex">
            <div className="flex min-w-20 rounded-l-lg border-r bg-muted px-3">
                <p className="my-auto">{point.method}</p>
            </div>
            <div className="mx-4 my-2 flex flex-col gap-0">
                <CustomLink href={`api-docs/${point.id}`}>
                    {point.name}
                </CustomLink>
                <Label>{point.route}</Label>
            </div>
        </Card>
    );
}
