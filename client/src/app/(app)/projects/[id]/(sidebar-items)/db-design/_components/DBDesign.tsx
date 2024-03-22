"use client";
import Heading from "@/components/custom/Heading";
import React, { useState } from "react";
import DatabaseTable from "./DatabaseTable";

export default function DBDesign() {
    const [data, setDate] = useState([
        {
            n: 4,
            x: 20,
            y: 0,
        },
        {
            n: 2,
            x: 202,
            y: 30,
        },
        {
            n: 8,
            x: 320,
            y: 900,
        },
    ]);
    return (
        <main className="w-screen-without-sidebar h-screen-without-navbar border border-emerald-300">
            <Heading>DB Desing</Heading>

            <section
                className="relative flex h-[70vh] overflow-x-auto overflow-y-auto border border-red-400"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const index = e.dataTransfer.getData("index");
                    const oldPageX = e.dataTransfer.getData("pageX");
                    const oldPageY = e.dataTransfer.getData("pageY");

                    console.log({ oldPageX, pageX: e.pageX });

                    const newDate = data;
                    newDate[Number(index)] = {
                        n: newDate[Number(index)].n,
                        x:
                            newDate[Number(index)].x +
                            (Number(e.clientX) - Number(oldPageX)),
                        y:
                            newDate[Number(index)].y +
                            (Number(e.clientY) - Number(oldPageY)),
                    };

                    setDate([...newDate]);

                    //console.log(e);
                }}>
                {data.map((table, index) => (
                    <DatabaseTable
                        index={index}
                        n={table.n}
                        y={table.y}
                        x={table.x}
                    />
                ))}
            </section>
        </main>
    );
}
