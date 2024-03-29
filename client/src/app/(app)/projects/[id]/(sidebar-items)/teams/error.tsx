"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import React from "react";
import ErrorMessage from "@/components/custom/ErrorMessage";

export default function error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="w-screen">
            <Container>
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
