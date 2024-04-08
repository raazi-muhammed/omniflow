import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { IEndpoint, IFolder } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { ApiDocService } from "@/services/api/api-doc.service";
import EndpointCard from "../../_components/EndpointCard";
import FolderCard from "../../_components/FolderCard";
import AnimateButton from "@/components/animated/AnimateButton";
import AddFolder from "../../_components/AddFolder";
import AddEndpoint from "../../_components/AddEndpoint";

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

export default async function page({ children }: { children: ReactNode }) {
    const endpoints: IEndpoint[] = await loadEndpoints();
    const folders: IFolder[] = await loadFolders();

    return (
        <Container>
            <SectionSplitter>
                <SectionAside className="mt-0 space-y-4">
                    <ActionItemsContainer>
                        <AddFolder replace={true} />
                        <AddEndpoint replace={true} />
                    </ActionItemsContainer>
                    {folders.map((folder) => (
                        <FolderCard key={folder.id} folder={folder} />
                    ))}
                    {endpoints.map((point) => (
                        <EndpointCard
                            replace={true}
                            key={point.id}
                            point={point}
                        />
                    ))}
                </SectionAside>
                <SectionContent className="overflow-auto">
                    {children}
                </SectionContent>
            </SectionSplitter>
        </Container>
    );
}
