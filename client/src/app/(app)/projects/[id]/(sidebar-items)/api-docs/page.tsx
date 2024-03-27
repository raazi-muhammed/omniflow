import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { IEndpoint, IFolder } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import ErrorMessage from "@/components/custom/ErrorMessage";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { ApiDocService } from "@/services/api/api-doc.service";
import EndpointCard from "./_components/EndpointCard";
import FolderCard from "./_components/FolderCard";

async function loadEndpoints() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ApiDocService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getEndpoints({}).exec();
    return response.data;
}

async function loadFolders() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ApiDocService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getFolders({}).exec();
    return response.data;
}

export default async function page() {
    const endpoints: IEndpoint[] = await loadEndpoints();
    const folders: IFolder[] = await loadFolders();
    return (
        <Container>
            <SectionSplitter>
                <SectionAside className="mt-0 space-y-4">
                    <ActionItemsContainer>
                        <Link href="api-docs/add-folder">
                            <Button size="sm" variant="muted">
                                <AddIcon />
                                Add folder
                            </Button>
                        </Link>
                        <Link href="api-docs/add-endpoint">
                            <Button size="sm">
                                <AddIcon />
                                Add endpoint
                            </Button>
                        </Link>
                    </ActionItemsContainer>

                    {folders.map((folder) => (
                        <FolderCard folder={folder} />
                    ))}

                    {endpoints.map((point) => (
                        <EndpointCard point={point} />
                    ))}
                    {endpoints.length === 0 && (
                        <ErrorMessage message="Not endpoints yet" type="info" />
                    )}
                </SectionAside>
                <SectionContent className="h-screen-without-navbar mx-8 flex align-middle">
                    <ErrorMessage
                        type="info"
                        message="Please select an endpoint to see the preview"
                    />
                </SectionContent>
            </SectionSplitter>
        </Container>
    );
}
