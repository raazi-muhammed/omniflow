"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import EditMemberAccessForm from "../_forms/EditMemberAccessForm";

export default function EditMemberAccess() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="actionIcon"
                    variant="muted"
                    className="ms-auto flex">
                    <Edit2Icon size="1em" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit member access</AlertDialogTitle>
                </AlertDialogHeader>
                <EditMemberAccessForm />
            </AlertDialogContent>
        </AlertDialog>
    );
}
