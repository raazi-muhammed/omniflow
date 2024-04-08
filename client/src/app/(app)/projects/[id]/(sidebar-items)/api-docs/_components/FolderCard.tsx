"use client";

import ErrorMessage from "@/components/custom/ErrorMessage";
import { Card } from "@/components/ui/card";
import { IEndpoint, IFolder } from "@/types/database";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Spinner from "@/components/custom/Spinner";
import { ApiDocService } from "@/services/api/api-doc.service";
import EndpointCard from "./EndpointCard";
import AnimateCard from "@/components/animated/AnimateCard";

export default function FolderCard({ folder }: { folder: IFolder }) {
    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState<IFolder[] | null>(null);
    const [endpoints, setEndpoints] = useState<IEndpoint[] | null>(null);

    async function getFolders() {
        setLoading(true);
        const service = new ApiDocService();
        const response = await service
            .getFolders({ parentFolder: folder.id })
            .exec();
        setFolders(response.data);

        service
            .getEndpoints({ parentFolder: folder.id })
            .exec()
            .then((res) => {
                setEndpoints(res.data);
            });

        setLoading(false);
    }

    return (
        <AnimateCard type="subtle">
            <Accordion
                type="single"
                collapsible
                onValueChange={() => {
                    if (!folders) getFolders();
                }}>
                <AccordionItem value="item-1 ">
                    <Card className="flex align-middle">
                        <AccordionTrigger className="h-full w-fit rounded-r-none bg-muted hover:bg-muted/90"></AccordionTrigger>
                        <section className="h-fit w-full p-3">
                            <p>{folder.name}</p>
                        </section>
                    </Card>
                    <AccordionContent className="my-4 ms-4 py-0">
                        <section className="grid w-full gap-4">
                            <>
                                {folders?.map((folder) => (
                                    <FolderCard
                                        key={folder.id}
                                        folder={folder}
                                    />
                                ))}
                                {loading ? (
                                    <div className="mx-auto my-2 w-fit">
                                        <Spinner />
                                    </div>
                                ) : (
                                    <>
                                        {folders?.length === 0 &&
                                            endpoints?.length === 0 && (
                                                <ErrorMessage
                                                    message="No content"
                                                    type="info"
                                                />
                                            )}
                                    </>
                                )}
                                {endpoints?.map((point) => (
                                    <EndpointCard
                                        key={point.id}
                                        point={point}
                                    />
                                ))}
                            </>
                        </section>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </AnimateCard>
    );
}
