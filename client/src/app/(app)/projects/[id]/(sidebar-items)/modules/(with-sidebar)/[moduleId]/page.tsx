import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";
import moment from "moment";
import Link from "next/link";
import EditModule from "./_components/EditModule";
import {
    PreviewActions,
    PreviewAside,
    PreviewContent,
    PreviewHeader,
} from "@/components/layout/PreviewHeader";
import { ModuleService } from "@/services/api/module.service";

async function getModuleDetails(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ModuleService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getModule(id).exec();
    return response.data as IModule;
}

export default async function page({
    params,
}: {
    params: { moduleId: string };
}) {
    const moduleData = await getModuleDetails(params.moduleId);

    return (
        <div>
            <Container className="space-y-6">
                <PreviewActions>
                    <EditModule module={moduleData} />
                </PreviewActions>
                <PreviewHeader>
                    <PreviewContent>
                        <Heading> {moduleData.name}</Heading>
                        <Label>Description</Label>
                        <p>{moduleData.description}</p>
                    </PreviewContent>
                    <PreviewAside>
                        <div>
                            <Label>Start Date</Label>
                            <p>{moment(moduleData.startDate).format("LL")}</p>
                        </div>
                        <div>
                            <Label>Due Date</Label>
                            <p>{moment(moduleData.dueDate).format("LL")}</p>
                        </div>
                    </PreviewAside>
                </PreviewHeader>
                <Separator />
                <Heading variant="sm">Dependencies</Heading>
                {moduleData.dependencies.length > 0 ? (
                    <section className="mt-2 flex gap-4">
                        {moduleData.dependencies.map((dep) => (
                            <Card key={dep.id} className="w-44 p-4">
                                <Link href={dep.id}>
                                    <p className="hover:underline">
                                        {dep.name}
                                    </p>
                                </Link>
                                <Label>{dep.description}</Label>
                            </Card>
                        ))}
                    </section>
                ) : (
                    <ErrorMessage
                        message="No dependencies"
                        type="info"
                        className="-ms-2 mt-2"
                    />
                )}
            </Container>
        </div>
    );
}
