"use client";

import AnimateButton from "@/components/animated/AnimateButton";
import { Button } from "@/components/ui/button";
import useHasAccess from "@/hooks/use-has-access-hook";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddEndpoint({
    replace = false,
}: {
    replace?: boolean;
}) {
    const { hasAccessToApiDoc } = useHasAccess();
    return (
        <AnimateButton>
            <Link
                href={replace ? "add-endpoint" : "api-docs/add-endpoint"}
                legacyBehavior>
                <Button disabled={hasAccessToApiDoc.edit} size="sm">
                    <AddIcon />
                    Add endpoint
                </Button>
            </Link>
        </AnimateButton>
    );
}
