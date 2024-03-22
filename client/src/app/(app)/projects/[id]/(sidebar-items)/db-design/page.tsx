import React from "react";
import DBDesign from "./_components/DBDesign";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";

export default function DbDesign() {
    return (
        <div>
            <Container className="mt-4 flex justify-between align-middle">
                <Heading>Database Design</Heading>
                <Link href="db-design/add" legacyBehavior>
                    <Button size="sm" variant="muted">
                        <AddIcon /> Add Table
                    </Button>
                </Link>
            </Container>
            <DBDesign />
        </div>
    );
}
