import Heading from "@/components/custom/Heading";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { ITable } from "@/types/database";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DeleteIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Container from "@/components/layout/Container";
import AddTableFieldForm from "./_components/AddTableFieldForm";
import { formatConstants } from "@/lib/formaters";
import DeleteTable from "./_components/DeleteTable";
import { TableService } from "@/services/api/table.service";

async function getEndpointData(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TableService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    const response = await service.getTable(id).exec();
    return response.data;
}

export default async function page({
    params,
}: {
    params: { tableId: string };
}) {
    const tableData: ITable = await getEndpointData(params.tableId);
    return (
        <Container>
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">{tableData.name}</Heading>
                    {tableData.fields.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status code</TableHead>
                                    <TableHead>Content Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableData.fields.map((response) => (
                                    <TableRow key={response.id}>
                                        <TableCell>{response.name}</TableCell>
                                        <TableCell>
                                            {formatConstants(response.type)}
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
                            message="No fields"
                        />
                    )}
                </SectionContent>
                <SectionAside>
                    <Accordion
                        type="single"
                        collapsible
                        className="rounded-xl border bg-card p-1">
                        <AccordionItem value="delete-table">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Delete table
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                                <p className="mb-4">
                                    Deleting this project will remove it from
                                    your workspace. Make sure you won&apos;t
                                    need it anymore
                                </p>
                                <DeleteTable tableId={tableData.id} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="add-a-field">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Add a field
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddTableFieldForm tableId={tableData.id} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </Container>
    );
}
