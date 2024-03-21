import Heading from "@/components/custom/Heading";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
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
import AddVariableForm from "./_forms/AddVariableForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import RemoveVariable from "./_components/RemoveVariable";
import ErrorMessage from "@/components/custom/ErrorMessage";
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
                    <Heading variant="spaced">Variables</Heading>
                    {endpointData.variables.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {endpointData.variables.map((variable) => (
                                    <TableRow>
                                        <TableCell>{variable.name}</TableCell>
                                        <TableCell>
                                            {formatConstants(variable.type)}
                                        </TableCell>
                                        <TableCell>
                                            {variable.description}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end">
                                                <RemoveVariable
                                                    variableId={variable.id}
                                                    endpointId={endpointData.id}
                                                />
                                            </div>
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
                                    Add variable
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddVariableForm endpointId={endpointData.id} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </Container>
    );
}
