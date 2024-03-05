import React from "react";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <Container>
            <div className="mt-36">
                <main className="flex flex-col gap-4">
                    <Skeleton className="h-8 w-36" />
                    <Skeleton className="h-44 w-96" />
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-8 w-44" />
                </main>
            </div>
        </Container>
    );
}
