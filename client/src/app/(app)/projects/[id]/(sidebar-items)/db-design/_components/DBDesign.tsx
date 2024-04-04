"use client";
import React, { useEffect, useState } from "react";
import DatabaseTable from "./DatabaseTable";
import { IRelation, ITable } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import LinkConnector from "./LineConnector";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Container from "@/components/layout/Container";
import RemoveRelation from "./RemoveRelation";
import { IResponse } from "@/services/api/utils";
import { TableService } from "@/services/api/table.service";

export default function DBDesign({ endpoints }: { endpoints: ITable[] }) {
    const { toast } = useToast();
    const [data, setDate] = useState<ITable[]>(endpoints);
    const [relations, setRelations] = useState<IRelation[]>([]);
    const [refresh, setRefresh] = useState(false);
    const refreshRelations = () => setRefresh((r) => !r);

    useEffect(() => {
        const service = new TableService();

        service
            .getRelations()
            .exec()
            .then((res) => {
                setRelations(res.data);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, [refresh]);

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

        const service = new TableService();
        makeApiCall(
            () => service.changeTablePosition(tableId, newPositions).exec(),
            {
                toast,
            }
        );
    }

    function handleOnDropRelation(
        e: React.DragEvent<HTMLElement>,
        onField: string
    ) {
        e.preventDefault();
        const fromField = e.dataTransfer.getData("fromField");
        const dataToAdd = { from: fromField, to: onField };

        const service = new TableService();
        makeApiCall(() => service.addRelation(dataToAdd).exec(), {
            toast,
            afterSuccess: (response: IResponse) => {
                setRelations((rel) => [...rel, response.data]);
            },
        });
    }

    return (
        <main className="w-screen-without-sidebar h-[calc(100vh-10rem)]">
            <section
                className="db-design relative h-full overflow-x-auto overflow-y-auto"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleOnDrop}>
                {data.length > 0 ? (
                    data.map((table, index) => (
                        <DatabaseTable
                            handleOnDropRelation={handleOnDropRelation}
                            key={table.id}
                            index={index}
                            table={table}
                        />
                    ))
                ) : (
                    <Container>
                        <ErrorMessage
                            type="info"
                            message="No tables"
                            className="-ms-2"
                        />
                    </Container>
                )}

                {relations.map((rel, index) => (
                    <LinkConnector
                        key={index}
                        container=".db-design"
                        data={data}
                        from={`.s${rel.from}`}
                        to={`.s${rel.to}`}>
                        <div className="grid h-full w-full place-items-center">
                            <RemoveRelation
                                refreshRelations={refreshRelations}
                                relationId={rel.id}
                            />
                        </div>
                    </LinkConnector>
                ))}
            </section>
        </main>
    );
}
