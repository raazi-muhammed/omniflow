"use client";

import ErrorMessage from "@/components/custom/ErrorMessage";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getModules } from "@/services/module.service";
import { IModule } from "@/types/database";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";

export default function ModuleCard({ module }: { module: IModule }) {
    const [loading, setLoading] = useState(false);
    const [subModules, setSubModules] = useState<IModule[] | null>(null);

    async function getSubModules() {
        setLoading(true);
        const data = await getModules({ parentModule: module.id });
        setSubModules(data.data);
        setLoading(false);
    }

    return (
        <Accordion
            type="single"
            collapsible
            onValueChange={() => {
                if (!subModules) getSubModules();
            }}>
            <AccordionItem value="item-1">
                <Card className="flex p-4 align-middle">
                    <AccordionTrigger className="my-auto h-8 w-fit"></AccordionTrigger>
                    <section className="h-fit w-full">
                        <p>{module.name}</p>
                        <div className="flex gap-2">
                            {module.dependencies.length > 0 ? (
                                <>
                                    <Label>Dependencies:</Label>
                                    {module.dependencies.map((dep) => (
                                        <Label>{dep.name}</Label>
                                    ))}
                                </>
                            ) : (
                                <Label>No dependencies</Label>
                            )}
                        </div>
                    </section>
                    <Link
                        href={`modules/add?parentModule=${module.id}`}
                        legacyBehavior>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-secondary">
                            <AddIcon />
                            Add module
                        </Button>
                    </Link>
                </Card>
                <AccordionContent className="my-4 ms-4 py-0">
                    <section className="grid w-full gap-4">
                        <>
                            {subModules?.map((module) => (
                                <ModuleCard module={module} />
                            ))}
                            {loading ? (
                                <div className="mx-auto my-2 w-fit">
                                    <Spinner />
                                </div>
                            ) : (
                                <>
                                    {subModules?.length === 0 && (
                                        <ErrorMessage
                                            message="No sub modules"
                                            type="info"
                                        />
                                    )}
                                </>
                            )}
                        </>
                    </section>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
