"use client";

import AnimateButton from "@/components/animated/AnimateButton";
import { Button } from "@/components/ui/button";
import useHasAccess from "@/hooks/use-has-access-hook";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddFolder({ replace = false }: { replace?: boolean }) {
    const { hasAccessToApiDoc } = useHasAccess();

    return (
        <AnimateButton>
            <Link
                href={replace ? "add-folder" : "api-docs/add-folder"}
                legacyBehavior>
                <Button
                    size="sm"
                    variant="muted"
                    disabled={hasAccessToApiDoc.edit}>
                    <AddIcon />
                    Add folder
                </Button>
            </Link>
        </AnimateButton>
    );
}
