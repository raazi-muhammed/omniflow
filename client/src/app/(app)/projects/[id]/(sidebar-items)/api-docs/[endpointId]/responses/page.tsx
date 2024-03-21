import Heading from "@/components/custom/Heading";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getEndpoint } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DeleteIcon } from "lucide-react";
import AddResponseForm from "./_forms/AddResponseForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import JsonView from "../../../../../../../../components/custom/JsonView";
import ErrorMessage from "@/components/custom/ErrorMessage";
import RemoveResponse from "./_components/RemoveResponse";
import { formatConstants } from "@/lib/formaters";
import Container from "@/components/layout/Container";

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
    console.log(response.data);

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
                    <Heading variant="spaced">Responses</Heading>
                    {endpointData.requests.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status code</TableHead>
                                    <TableHead>Content Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Body</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {endpointData.requests.map((response) => (
                                    <TableRow key={response.id}>
                                        <TableCell>
                                            {response.statusCode}
                                        </TableCell>
                                        <TableCell>
                                            {response.type.toLowerCase()}
                                        </TableCell>
                                        <TableCell>
                                            {response.description}
                                        </TableCell>
                                        <TableCell>
                                            {!!response?.body && (
                                                <JsonView
                                                    className="m-0 my-0"
                                                    data={response?.body}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <RemoveResponse
                                                endpointId={endpointData.id}
                                                responseId={response.id}
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
                            message="No responses"
                        />
                    )}
                </SectionContent>
                <SectionAside>
                    <Accordion
                        type="single"
                        collapsible
                        className="rounded-xl border bg-card p-1">
                        <AccordionItem value="delete-team">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Add response
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddResponseForm
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
