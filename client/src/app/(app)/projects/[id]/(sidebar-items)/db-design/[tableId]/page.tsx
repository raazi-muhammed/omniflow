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
import {
    Trash2 as DeleteIcon,
    ListPlus as AddFieldIcon,
    SquarePen as EditIcon,
} from "lucide-react";
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
import EditTableForm from "./_components/EditTableForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import DeleteTableField from "./_components/DeleteTableField";

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
                    <Label className="-mt-1 flex">
                        {tableData.description}
                    </Label>
                    <Separator className="my-4" />
                    {tableData.fields.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Options</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableData.fields.map((field) => (
                                    <TableRow key={field.id}>
                                        <TableCell>{field.name}</TableCell>
                                        <TableCell>
                                            {formatConstants(field.type)}
                                        </TableCell>
                                        <TableCell>
                                            {field.description}
                                        </TableCell>
                                        <TableCell>
                                            {field?.options
                                                ? field.options
                                                      .map((a) =>
                                                          formatConstants(a)
                                                      )
                                                      .join(", ")
                                                : null}
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <DeleteTableField
                                                tableId={params.tableId}
                                                fieldId={field.id}
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
                        <AccordionItem value="edit-table">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <EditIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Edit table
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="mx-2">
                                <EditTableForm table={tableData} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="add-a-field">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <AddFieldIcon
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
