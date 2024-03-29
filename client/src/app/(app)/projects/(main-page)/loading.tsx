import React from "react";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveGridContainer from "@/components/layout/ResponsiveGridContainer";
import Heading from "@/components/custom/Heading";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";

export default function loading() {
    return (
        <Container>
            <section className="my-8 ms-auto flex w-fit gap-2">
                <Link href="/projects/add-project">
                    <Button size="sm">
                        <AddIcon />
                        Add a project
                    </Button>
                </Link>
            </section>
            <Heading>Projects</Heading>
            <ResponsiveGridContainer>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </ResponsiveGridContainer>
        </Container>
    );
}
