import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getModules } from "@/services/module.service";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function loadModules() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getModules({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    return response.data;
}

export default async function page() {
    const modules: IModule[] = await loadModules();

    return (
        <Container>
            <ActionItemsContainer>
                <Link href="modules/add" passHref legacyBehavior>
                    <Button size="sm">
                        <AddIcon />
                        Add module
                    </Button>
                </Link>
            </ActionItemsContainer>
            <section className="grid gap-4">
                {modules.map((module) => (
                    <Card className="p-4">
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
                    </Card>
                ))}
                {modules.length === 0 && (
                    <ErrorMessage message="Not modules yet" type="info" />
                )}
            </section>
        </Container>
    );
}
