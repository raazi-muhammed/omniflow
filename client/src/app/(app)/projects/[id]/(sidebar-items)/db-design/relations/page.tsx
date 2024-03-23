import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getRelations } from "@/services/table.service";
import { IRelation } from "@/types/database";
import { cookies } from "next/headers";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Heading from "@/components/custom/Heading";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Container from "@/components/layout/Container";
import RemoveRelation from "./_component/RemoveRelation";

async function loadRelations() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getRelations({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    return response.data as IRelation[];
}

export default async function Relations() {
    const relations: IRelation[] = await loadRelations();

    return (
        <main>
            <Container>
                <Heading variant="sm">Relations</Heading>
                <br />
                {relations.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>To</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead className="w-20">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {relations.map((rel) => (
                                <TableRow key={rel.id}>
                                    <TableCell>{rel.to}</TableCell>
                                    <TableCell>{rel.from}</TableCell>
                                    <TableCell>
                                        <RemoveRelation relationId={rel.id} />
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
            </Container>
        </main>
    );
}
