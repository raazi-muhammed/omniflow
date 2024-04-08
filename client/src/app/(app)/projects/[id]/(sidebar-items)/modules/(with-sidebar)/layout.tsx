import ErrorMessage from "@/components/custom/ErrorMessage";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import ModuleCard from "../_components/ModuleCard";
import { ModuleService } from "@/services/api/module.service";
import AnimateButton from "@/components/animated/AnimateButton";

async function loadModules() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ModuleService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getModules({}).exec();
    return response.data;
}

export default async function page({
    children,
    params,
}: {
    children: ReactNode;
    params: { projectId: string };
}) {
    const modules: IModule[] = await loadModules();

    return (
        <Container className="w-full">
            <SectionSplitter>
                <SectionAside className="mt-0">
                    <ActionItemsContainer>
                        <AnimateButton>
                            <Link
                                href={`/projects/${params.projectId}/modules/add`}
                                legacyBehavior>
                                <Button size="sm">
                                    <AddIcon />
                                    Add module
                                </Button>
                            </Link>
                        </AnimateButton>
                    </ActionItemsContainer>
                    <section className="grid gap-4">
                        {modules.map((module) => (
                            <ModuleCard
                                key={module.id}
                                projectId={params.projectId}
                                module={module}
                            />
                        ))}
                        {modules.length === 0 && (
                            <ErrorMessage
                                message="Not modules yet"
                                type="info"
                            />
                        )}
                    </section>
                </SectionAside>
                <SectionContent>{children}</SectionContent>
            </SectionSplitter>
        </Container>
    );
}
