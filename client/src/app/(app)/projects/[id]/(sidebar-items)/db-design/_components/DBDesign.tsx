"use client";
import React, { useEffect, useState } from "react";
import DatabaseTable from "./DatabaseTable";
import { SteppedLineTo } from "react-lineto";
import {
    addRelation,
    changeTablePosition,
    getTables,
} from "@/services/table.service";
import { ITable } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

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

    function handleOnDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        const index = e.dataTransfer.getData("index");
        const oldPageX = e.dataTransfer.getData("pageX");
        const oldPageY = e.dataTransfer.getData("pageY");
        const tableId = e.dataTransfer.getData("tableId");

        if (!tableId) {
            toast({ description: "No table id" });
            return;
        }

        console.log({ oldPageX, pageX: e.pageX });

        const newDate = data;
        newDate[Number(index)] = {
            ...newDate[Number(index)],
            x:
                newDate[Number(index)].x +
                (Number(e.clientX) - Number(oldPageX)),
            y:
                newDate[Number(index)].y +
                (Number(e.clientY) - Number(oldPageY)),
        };

        setDate([...newDate]);

        changeTablePosition(
            { tableId },
            { x: newDate[Number(index)].x, y: newDate[Number(index)].y }
        )
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
    }

    function handleOnDropRelation(
        e: React.DragEvent<HTMLElement>,
        onField: string
    ) {
        e.preventDefault();
        const fromField = e.dataTransfer.getData("fromField");
        console.log(fromField, onField, e);
        setRelations((rel) => [...rel, { from: fromField, to: onField }]);

        addRelation({ to: onField, from: fromField })
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
    }

    const [data, setDate] = useState<ITable[]>([]);
    return (
        <main className="w-screen-without-sidebar h-screen-without-navbar border border-emerald-300">
            <section
                className="db-design relative h-[70vh] overflow-x-auto overflow-y-auto border border-red-400"
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

                {relations.map((rel) => (
                    <SteppedLineTo
                        within="db-design"
                        delay={true}
                        borderWidth={2}
                        borderColor="#242327"
                        from={rel.from}
                        to={rel.to}
                    />
                ))}
            </section>
        </main>
    );
}
