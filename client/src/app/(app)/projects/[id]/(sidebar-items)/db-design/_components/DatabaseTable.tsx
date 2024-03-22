"use client";

import CustomLink from "@/components/custom/CustomLink";
import Heading from "@/components/custom/Heading";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ITable } from "@/types/database";
import React from "react";

export default function DatabaseTable({
    table,
    index,
}: {
    table: ITable;
    index: number;
}) {
    return (
        <div
            style={{
                top: `${table.y}px`,
                left: `${table.x}px`,
            }}
            className={`absolute border p-12 ${table.id}`}>
            <Card
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("index", String(index));
                    e.dataTransfer.setData("pageX", String(e.clientX));
                    e.dataTransfer.setData("pageY", String(e.clientY));
                    e.dataTransfer.setData("tableId", String(table.id));
                }}
                className="min-w-48 space-y-3 p-4">
                <CustomLink href={`db-design/${table.id}`}>
                    <Heading variant="sm">{table.name}</Heading>
                </CustomLink>
                <Separator />
                {[...Array(3)].map(() => (
                    <section className="grid grid-cols-2">
                        <div>
                            <p>name</p>
                            <Label className="flex">optional</Label>
                        </div>
                        <p className="text-end">string</p>
                    </section>
                ))}
            </Card>
        </div>
    );
}
