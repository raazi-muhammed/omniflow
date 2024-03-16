import Heading from "@/components/custom/Heading";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <Container>
            <ActionItemsContainer>
                <Link href="modules/add" passHref legacyBehavior>
                    <Button size="sm">
                        <AddIcon />
                        Add modules item
                    </Button>
                </Link>
            </ActionItemsContainer>
            <Heading>Modules</Heading>
        </Container>
    );
}
