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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import JsonView from "@/components/custom/JsonView";
import ErrorMessage from "@/components/custom/ErrorMessage";

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
                            <Label>Method</Label>
                            <p>{endpoint.method}</p>
                        </div>
                        <div>
                            <Label>URL</Label>
                            <p>{endpoint.route}</p>
                        </div>
                        <div>
                            <Label>Summary</Label>
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
                                    <Button size="sm" variant="muted">
                                        <EditIcon /> Edit variables
                                    </Button>
                                </Link>
                            </section>
                            {endpoint.variables.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {endpoint.variables.map((variable) => (
                                            <TableRow>
                                                <TableCell>
                                                    {variable.name}
                                                </TableCell>
                                                <TableCell>
                                                    {variable.type}
                                                </TableCell>
                                                <TableCell>
                                                    {variable.description}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <ErrorMessage
                                    className="-ms-2"
                                    type="info"
                                    message="No variables"
                                />
                            )}
                        </TabsContent>
                        <TabsContent value="headers">
                            <section className="flex justify-between align-bottom">
                                <Heading variant="sm">Headers</Heading>
                                <Link href={`${endpointId}/headers`}>
                                    <Button size="sm" variant="muted">
                                        <EditIcon /> Edit headers
                                    </Button>
                                </Link>
                            </section>
                            {endpoint.headers.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Key</TableHead>
                                            <TableHead>Value</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {endpoint.headers.map((header) => (
                                            <TableRow>
                                                <TableCell>
                                                    {header.key}
                                                </TableCell>
                                                <TableCell>
                                                    {header.value}
                                                </TableCell>
                                                <TableCell>
                                                    {header.description}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <ErrorMessage
                                    className="-ms-2"
                                    type="info"
                                    message="No headers"
                                />
                            )}
                        </TabsContent>
                        <TabsContent value="request-body">
                            <section className="flex justify-between align-bottom">
                                <Heading variant="sm">Body</Heading>
                                <Link href={`${endpointId}/body`}>
                                    <Button size="sm" variant="muted">
                                        <EditIcon /> Edit body
                                    </Button>
                                </Link>
                            </section>
                            {endpoint.body ? (
                                <JsonView
                                    className="border"
                                    data={endpoint.body}
                                />
                            ) : (
                                <ErrorMessage
                                    className="-ms-2"
                                    type="info"
                                    message="No body"
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                    <div>
                        <section className="flex justify-between align-bottom">
                            <Heading variant="sm">Responses</Heading>
                            <Link href={`${endpointId}/responses`}>
                                <Button size="sm" variant="muted">
                                    <EditIcon /> Edit responses
                                </Button>
                            </Link>
                        </section>
                        {endpoint.requests.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status code</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {endpoint.requests.map((header) => (
                                        <TableRow>
                                            <TableCell>
                                                {header.statusCode}
                                            </TableCell>
                                            <TableCell>
                                                {header.description}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <ErrorMessage
                                className="-ms-2"
                                type="info"
                                message="No responses"
                            />
                        )}
                    </div>
                </>
            ) : (
                <p>Hoooi</p>
            )}
        </main>
    );
}
