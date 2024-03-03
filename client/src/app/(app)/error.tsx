"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import React, { useEffect } from "react";

export default function error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error({ error });
    }, [error]);

    return (
        <div>
            <Container>
                <h2 className="mt-14 text-center">
                    {error?.message || "Somethings went wrong"}
                </h2>
                <Button
                    size="icon"
                    variant="ghost"
                    className="mx-auto my-8 flex"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }>
                    <RotateCw />
                </Button>
            </Container>
        </div>
    );
}
