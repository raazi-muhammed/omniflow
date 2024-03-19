import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getModule } from "@/services/module.service";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";
import moment from "moment";
import Link from "next/link";

async function getModuleDetails(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getModule(
        { moduleId: id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data as IModule;
}

export default async function page({
    params,
}: {
    params: { moduleId: string };
}) {
    const module = await getModuleDetails(params.moduleId);

    return (
        <div>
            <Container className="space-y-6">
                <Heading variant="spaced"> {module.name}</Heading>
                <section className="grid grid-cols-3">
                    <div>
                        <Label>Description</Label>
                        <p>{module.description}</p>
                    </div>
                    <div>
                        <Label>Start Date</Label>
                        <p>{moment(module.startDate).format("LL")}</p>
                    </div>
                    <div>
                        <Label>Due Date</Label>
                        <p>{moment(module.dueDate).format("LL")}</p>
                    </div>
                </section>
                <Separator />
                <Heading variant="sm">Dependencies</Heading>
                {module.dependencies.length > 0 ? (
                    <section className="mt-2 flex gap-4">
                        {module.dependencies.map((dep) => (
                            <Card className="w-44 p-4">
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
