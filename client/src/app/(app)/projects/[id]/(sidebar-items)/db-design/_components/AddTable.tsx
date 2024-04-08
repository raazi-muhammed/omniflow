"use client";

import AnimateButton from "@/components/animated/AnimateButton";
import { Button } from "@/components/ui/button";
import useHasAccess from "@/hooks/use-has-access-hook";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddTable() {
    const { hasAccessToDbDesign } = useHasAccess();
    return (
        <AnimateButton>
            <Link href="db-design/add" legacyBehavior>
                <Button size="sm" disabled={hasAccessToDbDesign.edit}>
                    <AddIcon /> Add Table
                </Button>
            </Link>
        </AnimateButton>
    );
}
