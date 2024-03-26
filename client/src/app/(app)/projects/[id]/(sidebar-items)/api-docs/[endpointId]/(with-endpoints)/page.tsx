import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import { IEndpoint } from "@/types/database";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import EditEndpoint from "../_components/EditEndpoint";
import { formatConstants } from "@/lib/formaters";
import { SectionContent } from "@/components/layout/SectinSplitter";
import {
    PreviewActions,
    PreviewAside,
    PreviewContent,
    PreviewHeader,
} from "@/components/layout/PreviewHeader";
import { ApiDocService } from "@/services/api/api-doc.service";

async function getEndpointData(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new ApiDocService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getEndpoint(id).exec();
    return response.data;
}

export default async function Endpoint({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpoint: IEndpoint = await getEndpointData(params.endpointId);
    return (
        <SectionContent className="mb-12 w-full space-y-6 border-l ps-8">
            <PreviewActions>
                <EditEndpoint endpoint={endpoint} />
            </PreviewActions>
            <PreviewHeader>
                <PreviewContent>
                    <Heading>{endpoint.name}</Heading>
                    <div>
                        <Label>Summary</Label>
                        <p>
                            {endpoint.summary ? endpoint.summary : "No summary"}
                        </p>
                    </div>
                </PreviewContent>
                <PreviewAside>
                    <div>
                        <Label>Method</Label>
                        <p>{endpoint.method}</p>
                    </div>
                    <div>
                        <Label>URL</Label>
                        <p>{endpoint.route}</p>
                    </div>
                </PreviewAside>
            </PreviewHeader>
            <Separator className="my-0" />
            <Tabs defaultValue="variables" className="w-full">
                <TabsList className="mx-auto flex w-fit">
                    <TabsTrigger value="variables">Variables</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="request-body">Request Body</TabsTrigger>
                </TabsList>
                <TabsContent value="variables">
                    <section className="mb-3 flex justify-between align-bottom">
                        <Heading className="mt-auto" variant="sm">
                            Variables
                        </Heading>
                        <Link href={`${params.endpointId}/variables`}>
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
                                    <TableRow key={variable.id}>
                                        <TableCell>{variable.name}</TableCell>
                                        <TableCell>
                                            {formatConstants(variable.type)}
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
                    <section className="mb-3 flex justify-between align-bottom">
                        <Heading className="mt-auto" variant="sm">
                            Headers
                        </Heading>
                        <Link href={`${params.endpointId}/headers`}>
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
                                    <TableRow key={header.id}>
                                        <TableCell>{header.key}</TableCell>
                                        <TableCell>{header.value}</TableCell>
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
                    <section className="mb-3 flex justify-between align-bottom">
                        <Heading className="mt-auto" variant="sm">
                            Body
                        </Heading>
                        <Link href={`${params.endpointId}/body`}>
                            <Button size="sm" variant="muted">
                                <EditIcon /> Edit body
                            </Button>
                        </Link>
                    </section>
                    {endpoint.body ? (
                        <JsonView className="m-0 border" data={endpoint.body} />
                    ) : (
                        <ErrorMessage
                            className="-ms-2"
                            type="info"
                            message="No body"
                        />
                    )}
                    {endpoint.schema.length > 0 ? (
                        <Table className="mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Options</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {endpoint.schema.map((sch) => (
                                    <TableRow key={sch.id}>
                                        <TableCell>{sch.key}</TableCell>
                                        <TableCell>
                                            {formatConstants(sch.type)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {sch.options.map(
                                                    (option, index) => (
                                                        <p key={index}>
                                                            {formatConstants(
                                                                option
                                                            )}
                                                            {index !==
                                                                sch.options
                                                                    .length -
                                                                    1 && ","}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <ErrorMessage
                            className="-ms-2 mt-4"
                            type="info"
                            message="No schema"
                        />
                    )}
                </TabsContent>
            </Tabs>
            <Separator />
            <div>
                <section className="mb-3 flex justify-between align-bottom">
                    <Heading className="mt-auto" variant="sm">
                        Responses
                    </Heading>
                    <Link href={`${params.endpointId}/responses`}>
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
                                <TableHead>Content Type</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {endpoint.requests.map((response) => (
                                <TableRow key={response.id}>
                                    <TableCell>{response.statusCode}</TableCell>
                                    <TableCell>
                                        {response.type.toLowerCase()}
                                    </TableCell>
                                    <TableCell>
                                        {response.description}
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
        </SectionContent>
    );
}
