import React from "react";
import DBDesign from "./_components/DBDesign";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import { Unlink2 as RelationIcon } from "lucide-react";
import { cookies } from "next/headers";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { TableService } from "@/services/api/table.service";
import { ITable } from "@/types/database";
import AddTable from "./_components/AddTable";
import AnimateButton from "@/components/animated/AnimateButton";

async function loadTables() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TableService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getTables().exec();
    return response.data;
}

export default async function DbDesign() {
    const endpoints: ITable[] = await loadTables();

    return (
        <div>
            <Container className="mt-4 flex justify-between align-middle">
                <Heading>Database Design</Heading>
                <div className="flex-end flex gap-2">
                    <AnimateButton>
                        <Link href="db-design/relations" legacyBehavior>
                            <Button size="sm" variant="muted">
                                <RelationIcon size="1.3em" className="me-2" />
                                Relations
                            </Button>
                        </Link>
                    </AnimateButton>
                    <AddTable />
                </div>
            </Container>
            <DBDesign endpoints={endpoints} />
        </div>
    );
}
