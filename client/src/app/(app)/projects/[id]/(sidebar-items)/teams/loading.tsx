import React from "react";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <Container>
            <div className="mt-36">
                <main className="flex flex-col gap-4">
                    <Skeleton className="h-10 w-52" />
                    <section className="flex gap-4">
                        <Skeleton className="h-20 w-52" />
                        <Skeleton className="h-20 w-52" />
                        <Skeleton className="h-20 w-52" />
                    </section>
                    <Skeleton className="h-10 w-52" />
                    <section className="flex gap-4">
                        <Skeleton className="h-20 w-52" />
                        <Skeleton className="h-20 w-52" />
                        <Skeleton className="h-20 w-52" />
                    </section>
                </main>
            </div>
        </Container>
    );
}
