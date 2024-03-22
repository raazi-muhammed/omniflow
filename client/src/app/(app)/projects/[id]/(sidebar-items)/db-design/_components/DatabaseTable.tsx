"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function DatabaseTable({
    index,
    n,
    x,
    y,
}: {
    index: number;
    n: number;
    x: number;
    y: number;
}) {
    return (
        <div
            style={{
                top: `${y}px`,
                left: `${x}px`,
            }}
            className="absolute border p-12">
            <Card
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("index", String(index));
                    e.dataTransfer.setData("pageX", String(e.clientX));
                    e.dataTransfer.setData("pageY", String(e.clientY));
                }}
                className="min-w-48 space-y-3 p-4">
                {[...Array(n)].map(() => (
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
