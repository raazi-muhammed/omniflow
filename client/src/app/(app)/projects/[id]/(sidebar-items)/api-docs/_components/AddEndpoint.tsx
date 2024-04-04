"use client";

import { Button } from "@/components/ui/button";
import useHasAccess from "@/hooks/use-has-access-hook";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddEndpoint() {
    const { hasAccessToApiDoc } = useHasAccess();
    return (
        <Link href="api-docs/add-endpoint" legacyBehavior>
            <Button disabled={hasAccessToApiDoc.edit} size="sm">
                <AddIcon />
                Add endpoint
            </Button>
        </Link>
    );
}
