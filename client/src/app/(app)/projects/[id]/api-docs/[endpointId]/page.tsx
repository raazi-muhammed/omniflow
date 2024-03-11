import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getEndpoints } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { Eye as ViewIcon } from "lucide-react";
import Endpoint from "./_components/Endpoint";

async function loadEndpoints() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getEndpoints({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    return response.data;
}

export default async function page({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpoints: IEndpoint[] = await loadEndpoints();
    return (
        <Container>
            <ActionItemsContainer>
                <Link href="add-endpoint">
                    <Button size="sm">
                        <AddIcon />
                        Add endpoint
                    </Button>
                </Link>
            </ActionItemsContainer>
            <main className="grid w-full grid-cols-3">
                <section className="space-y-4">
                    {endpoints.map((point) => (
                        <Card className="flex">
                            <div className="flex min-w-20 rounded-l-lg border-r bg-card-to px-3">
                                <p className="my-auto">{point.method}</p>
                            </div>
                            <div className="mx-4 my-2 flex flex-col gap-0">
                                <p className="font-bold">{point.name}</p>
                                <small className="text-secondary">
                                    {point.route}
                                </small>
                            </div>
                            <Link
                                className="my-auto me-6 ms-auto"
                                href={`${point.id}`}>
                                <Button size="icon" variant="ghost">
                                    <ViewIcon
                                        className="text-secondary"
                                        size="1.2em"
                                    />
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </section>
                <section className="col-span-2 w-full overflow-auto px-8">
                    <Endpoint endpointId={params.endpointId} />
                </section>
            </main>
        </Container>
    );
}
