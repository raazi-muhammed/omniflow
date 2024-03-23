"use client";
import React, { useEffect, useState } from "react";
import DatabaseTable from "./DatabaseTable";
import { SteppedLineTo } from "react-lineto";
import {
    addRelation,
    changeTablePosition,
    getRelations,
    getTables,
} from "@/services/table.service";
import { ITable } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";

export default function DBDesign() {
    const { toast } = useToast();
    const [relations, setRelations] = useState<{ from: string; to: string }[]>(
        []
    );

    useEffect(() => {
        getTables().then((res) => {
            console.log(res.data);
            setDate(res.data);
        });
    }, []);
    useEffect(() => {
        getRelations().then((res) => {
            console.log(res.data);
            setRelations(res.data);
        });
    }, []);

    function handleOnDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        const index = Number(e.dataTransfer.getData("index"));
        const oldPageX = Number(e.dataTransfer.getData("pageX"));
        const oldPageY = Number(e.dataTransfer.getData("pageY"));
        const tableId = e.dataTransfer.getData("tableId");

        const currentClientX = Number(e.clientX);
        const currentClientY = Number(e.clientY);

        if (!tableId) {
            toast({ description: "No table id" });
            return;
        }

        const newDate = data;
        const newPositions = {
            x: newDate[index].x + (currentClientX - oldPageX),
            y: newDate[index].y + (currentClientY - oldPageY),
        };
        newDate[index] = {
            ...newDate[index],
            ...newPositions,
        };

        setDate([...newDate]);

        makeApiCall(() => changeTablePosition({ tableId }, newPositions), {
            toast,
        });
    }

    function handleOnDropRelation(
        e: React.DragEvent<HTMLElement>,
        onField: string
    ) {
        e.preventDefault();
        const fromField = e.dataTransfer.getData("fromField");
        const dataToAdd = { from: fromField, to: onField };

        setRelations((rel) => [...rel, dataToAdd]);

        makeApiCall(() => addRelation(dataToAdd), {
            toast,
        });
    }

    const [data, setDate] = useState<ITable[]>([]);
    return (
        <main className="w-screen-without-sidebar h-[calc(100vh-10rem)]">
            <section
                className="db-design relative h-full overflow-x-auto overflow-y-auto"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleOnDrop}>
                {data.map((table, index) => (
                    <DatabaseTable
                        handleOnDropRelation={handleOnDropRelation}
                        key={table.id}
                        index={index}
                        table={table}
                    />
                ))}

                {relations.map((rel, index) => (
                    <SteppedLineTo
                        orientation="h"
                        key={index}
                        within="db-design"
                        fromAnchor={`${index * 3}`}
                        toAnchor={`${index * 3}`}
                        delay={true}
                        borderWidth={1}
                        borderColor="#5A24AE"
                        from={rel.from}
                        to={rel.to}
                    />
                ))}
            </section>
        </main>
    );
}
