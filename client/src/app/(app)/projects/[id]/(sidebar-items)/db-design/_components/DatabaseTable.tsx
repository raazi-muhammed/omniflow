"use client";

import CustomLink from "@/components/custom/CustomLink";
import Heading from "@/components/custom/Heading";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatConstants } from "@/lib/formaters";
import { ITable } from "@/types/database";
import React from "react";

export default function DatabaseTable({
    handleOnDropRelation,
    table,
    index,
}: {
    handleOnDropRelation: (
        e: React.DragEvent<HTMLElement>,
        onField: string
    ) => void;
    table: ITable;
    index: number;
}) {
    return (
        <div
            style={{
                top: `${table.y}px`,
                left: `${table.x}px`,
            }}
            className={`absolute p-12 ${table.id}`}>
            <Card
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("index", String(index));
                    e.dataTransfer.setData("pageX", String(e.clientX));
                    e.dataTransfer.setData("pageY", String(e.clientY));
                    e.dataTransfer.setData("tableId", String(table.id));
                }}
                className="min-w-48 space-y-3 p-3">
                <CustomLink href={`db-design/${table.id}`}>
                    <Heading variant="sm">{table.name}</Heading>
                </CustomLink>
                <Separator />
                {table.fields.map((field) => (
                    <section key={field.id} className="grid grid-cols-2">
                        <div className="flex gap-2">
                            <section
                                draggable
                                onDragStart={(e) => {
                                    e.stopPropagation();
                                    e.dataTransfer.setData(
                                        "fromField",
                                        field.id
                                    );
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) =>
                                    handleOnDropRelation(e, field.id)
                                }
                                className={`bg-muted rounded-full p-2 s${field.id} w-4 h-4 my-auto z-50`}></section>
                            <div>
                                <p>{field.name}</p>
                                <Label className="flex">
                                    {field.description}
                                </Label>
                            </div>
                        </div>
                        <p className="text-end">
                            {formatConstants(field.type)}
                        </p>
                    </section>
                ))}
            </Card>
        </div>
    );
}
