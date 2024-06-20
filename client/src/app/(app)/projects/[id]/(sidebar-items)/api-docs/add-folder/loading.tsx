import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/custom/Heading";
import FormWrapper from "@/components/layout/FormWrapper";

export default function loading() {
    return (
        <div className="w-screen">
            <FormWrapper className="space-y-4">
                <Heading variant="spaced">Add folder</Heading>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
            </FormWrapper>
        </div>
    );
}
