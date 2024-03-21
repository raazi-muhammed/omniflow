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
import CustomLink from "@/components/custom/CustomLink";

export default function ModuleCard({
    module,
    projectId,
}: {
    module: IModule;
    projectId: string;
}) {
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
            <AccordionItem value="item-1 ">
                <Card className="flex align-middle">
                    <AccordionTrigger className="h-full w-fit rounded-r-none bg-muted hover:bg-muted/90"></AccordionTrigger>
                    <section className="h-fit w-full p-3">
                        <CustomLink
                            href={`/projects/${projectId}/modules/${module.id}`}>
                            {module.name}
                        </CustomLink>
                        <section>
                            {module.dependencies.length > 0 ? (
                                <>
                                    <Label className="mb-0">Dependencies</Label>
                                    <section className="-mt-1 flex h-fit flex-wrap gap-4">
                                        {module.dependencies.map((dep) => (
                                            <Link
                                                href={`/projects/${projectId}/modules/${dep.id}`}>
                                                <Label className="hover:underline">
                                                    {dep.name}
                                                </Label>
                                            </Link>
                                        ))}
                                    </section>
                                </>
                            ) : (
                                <Label>No dependencies</Label>
                            )}
                        </section>
                    </section>
                    <Link
                        href={`/projects/${projectId}/modules/add?parentModule=${module.id}`}
                        legacyBehavior>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="my-auto me-2 text-secondary">
                            <AddIcon />
                            Add module
                        </Button>
                    </Link>
                </Card>
                <AccordionContent className="my-4 ms-4 py-0">
                    <section className="grid w-full gap-4">
                        <>
                            {subModules?.map((module) => (
                                <ModuleCard
                                    projectId={projectId}
                                    module={module}
                                />
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
