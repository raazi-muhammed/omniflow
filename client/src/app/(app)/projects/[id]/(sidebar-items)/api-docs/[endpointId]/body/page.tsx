import Heading from "@/components/custom/Heading";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DeleteIcon } from "lucide-react";
import AddBodyForm from "./_forms/AddBodyForm";
import AddSchemaForm from "./_forms/AddSchemaForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import JsonView from "@/components/custom/JsonView";
import RemoveSchema from "./_components/RemoveSchema";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { formatConstants } from "@/lib/formaters";
import Container from "@/components/layout/Container";
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

export default async function page({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpointData: IEndpoint = await getEndpointData(params.endpointId);
    return (
        <Container>
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">Body</Heading>
                    {endpointData.body ? (
                        <JsonView className="border" data={endpointData.body} />
                    ) : (
                        <ErrorMessage type="info" message="No body" />
                    )}
                    <Heading variant="spaced">Schema</Heading>
                    {endpointData.schema.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Options</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {endpointData.schema.map((sch) => (
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
                                        <TableCell>
                                            <RemoveSchema
                                                endpointId={endpointData.id}
                                                schemaId={sch.id}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <ErrorMessage
                            className="-ms-2"
                            type="info"
                            message="No schema"
                        />
                    )}
                </SectionContent>
                <SectionAside>
                    <Accordion
                        type="single"
                        collapsible
                        className="rounded-xl border bg-card p-1">
                        <AccordionItem value="add-body">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Add body
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddBodyForm
                                    bodyData={endpointData.body}
                                    endpointId={endpointData.id}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="add-schema">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Add schema
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddSchemaForm
                                    endpointId={endpointData.id || ""}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </Container>
    );
}
