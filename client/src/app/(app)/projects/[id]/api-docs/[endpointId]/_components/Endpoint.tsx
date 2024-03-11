import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import { getEndpoint } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import BodyComponent from "./BodyComponent";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { EditIcon } from "@/lib/icons";
import Link from "next/link";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { cookies } from "next/headers";

async function getEndpointData(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getEndpoint(
        { id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data;
}

export default async function Endpoint({ endpointId }: { endpointId: string }) {
    const endpoint: IEndpoint = await getEndpointData(endpointId);

    return (
        <main className="mb-12 w-full space-y-6">
            {endpoint ? (
                <>
                    <Heading>{endpoint.name}</Heading>
                    <section className="grid grid-cols-3">
                        <div>
                            <small className="text-secondary">Method</small>
                            <p>{endpoint.method}</p>
                        </div>
                        <div>
                            <small className="text-secondary">URL</small>
                            <p>{endpoint.route}</p>
                        </div>
                        <div>
                            <small className="text-secondary">Summary</small>
                            <p>
                                {endpoint.summary
                                    ? endpoint.summary
                                    : "No summary"}
                            </p>
                        </div>
                    </section>
                    <Separator className="my-0" />
                    <Tabs defaultValue="variables" className="w-full">
                        <TabsList className="mx-auto flex w-fit">
                            <TabsTrigger value="variables">
                                Variables
                            </TabsTrigger>
                            <TabsTrigger value="headers">Headers</TabsTrigger>
                            <TabsTrigger value="request-body">
                                Request Body
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="variables">
                            <section className="flex justify-between align-bottom">
                                <Heading variant="sm">Variables</Heading>
                                <Link href={`${endpointId}/variables`}>
                                    <Button size="sm" variant="secondary">
                                        <EditIcon /> Edit variables
                                    </Button>
                                </Link>
                            </section>
                            <section className="mt-4 space-y-2">
                                <div className="grid grid-cols-3 justify-between gap-4 px-4 text-xs text-secondary">
                                    <p>Name</p>
                                    <p>Type</p>
                                    <p>Description</p>
                                </div>
                                {endpoint.variables.map((variable) => (
                                    <Card className="grid grid-cols-3 justify-between gap-4 px-4 py-2">
                                        <p>{variable.name}</p>
                                        <p>{variable.type}</p>
                                        <p>{variable.description}</p>
                                    </Card>
                                ))}
                            </section>
                        </TabsContent>
                        <TabsContent value="headers">
                            <section className="flex justify-between align-bottom">
                                <Heading variant="sm">Headers</Heading>
                                <Link href={`${endpointId}/headers`}>
                                    <Button size="sm" variant="secondary">
                                        <EditIcon /> Edit headers
                                    </Button>
                                </Link>
                            </section>
                            <section className="mt-4 space-y-2">
                                <div className="grid grid-cols-3 justify-between gap-4 px-4 text-xs text-secondary">
                                    <p>Key</p>
                                    <p>Value</p>
                                    <p>Description</p>
                                </div>
                                {endpoint.headers.map((variable) => (
                                    <Card className="grid grid-cols-3 justify-between gap-4 px-4 py-2">
                                        <p>{variable.key}</p>
                                        <p>{variable.value}</p>
                                        <p>{variable.description}</p>
                                    </Card>
                                ))}
                            </section>
                        </TabsContent>
                        <TabsContent value="request-body">
                            <section className="flex justify-between align-bottom">
                                <Heading variant="sm">Body</Heading>
                                <Link href={`${endpointId}/body`}>
                                    <Button size="sm" variant="secondary">
                                        <EditIcon /> Edit body
                                    </Button>
                                </Link>
                            </section>
                            <BodyComponent bodyData={endpoint.body} />
                        </TabsContent>
                    </Tabs>

                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        <section className="flex justify-between align-bottom">
                            <Heading variant="sm">Responses</Heading>
                            <Link href={`${endpointId}/responses`}>
                                <Button size="sm" variant="secondary">
                                    <EditIcon /> Edit responses
                                </Button>
                            </Link>
                        </section>
                    </div>
                </>
            ) : (
                <p>Hoooi</p>
            )}
        </main>
    );
}
