import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getModule } from "@/services/module.service";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";

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
            <Container>
                <Heading variant="spaced"> {module.name}</Heading>
                <Label>{module.description}</Label>
                {module.dependencies.map((dep) => (
                    <Card className="m-1 p-2">
                        <p>{dep.name}</p>
                    </Card>
                ))}
            </Container>
        </div>
    );
}
