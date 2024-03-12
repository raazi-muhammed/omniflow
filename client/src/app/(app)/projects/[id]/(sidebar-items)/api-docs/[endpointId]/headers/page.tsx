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
import AddHeadersForm from "./_forms/AddHeadersForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import RemoveHeader from "./_components/RemoveHeader";
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

export default async function page({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpointData: IEndpoint = await getEndpointData(params.endpointId);
    return (
        <>
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">Headers</Heading>
                    {endpointData.headers.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {endpointData.headers.map((header) => (
                                    <TableRow>
                                        <TableCell>{header.key}</TableCell>
                                        <TableCell>{header.value}</TableCell>
                                        <TableCell>
                                            {header.description}
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <RemoveHeader
                                                endpointId={endpointData.id}
                                                headerId={header.id}
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
                            message="No headers"
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
                                    Add headers
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddHeadersForm endpointId={endpointData.id} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </>
    );
}
