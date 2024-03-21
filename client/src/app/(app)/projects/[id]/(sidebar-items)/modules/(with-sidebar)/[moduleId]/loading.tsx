import React from "react";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <Container>
            <div className="mt-36">
                <main className="flex flex-col gap-4">
                    <Skeleton className="h-16 max-w-md" />
                    <Skeleton className="h-16 max-w-md" />
                    <Skeleton className="h-16 max-w-md" />
                </main>
            </div>
        </Container>
    );
}
