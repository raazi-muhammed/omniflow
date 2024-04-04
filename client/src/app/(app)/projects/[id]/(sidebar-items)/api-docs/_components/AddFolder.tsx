"use client";

import { Button } from "@/components/ui/button";
import useHasAccess from "@/hooks/use-has-access-hook";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddFolder() {
    const { hasAccessToApiDoc } = useHasAccess();

    return (
        <Link href="api-docs/add-folder" legacyBehavior>
            <Button size="sm" variant="muted" disabled={hasAccessToApiDoc.edit}>
                <AddIcon />
                Add folder
            </Button>
        </Link>
    );
}
