import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import CustomLink from "@/components/custom/CustomLink";
import { ApiDocService } from "@/services/api/api-doc.service";

async function loadEndpoints() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ApiDocService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getEndpoints().exec();
    return response.data;
}

export default async function page({ children }: { children: ReactNode }) {
    const endpoints: IEndpoint[] = await loadEndpoints();
    return (
        <Container>
            <SectionSplitter>
                <SectionAside className="mt-0 space-y-4">
                    <ActionItemsContainer>
                        <Link href="add-endpoint">
                            <Button size="sm">
                                <AddIcon />
                                Add endpoint
                            </Button>
                        </Link>
                    </ActionItemsContainer>
                    {endpoints.map((point) => (
                        <Card key={point.id} className="flex">
                            <div className="flex min-w-20 rounded-l-lg border-r bg-muted px-3">
                                <p className="my-auto">{point.method}</p>
                            </div>
                            <div className="mx-4 my-2 flex flex-col gap-0">
                                <CustomLink href={`${point.id}`}>
                                    {point.name}
                                </CustomLink>
                                <Label>{point.route}</Label>
                            </div>
                        </Card>
                    ))}
                </SectionAside>
                <SectionContent className="overflow-auto">
                    {children}
                </SectionContent>
            </SectionSplitter>
        </Container>
    );
}
