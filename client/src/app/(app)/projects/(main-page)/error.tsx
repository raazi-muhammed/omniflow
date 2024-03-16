"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import React from "react";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import ErrorMessage from "@/components/custom/ErrorMessage";

export default function error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <Container>
                <section className="my-8 ms-auto flex w-fit gap-2">
                    <Link href="/projects/add-project">
                        <Button size="sm">
                            <AddIcon />
                            Add a project
                        </Button>
                    </Link>
                </section>
                <div className="mx-auto mt-14 w-fit">
                    <ErrorMessage message={error?.message} />
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="mx-auto my-8 flex text-secondary"
                    onClick={() => reset()}>
                    <RotateCw />
                </Button>
            </Container>
        </div>
    );
}
