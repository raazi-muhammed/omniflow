"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import EditMemberAccessForm from "../_forms/EditMemberAccessForm";
import { IUser } from "@/types/database";

export default function EditMemberAccess({ user }: { user: IUser }) {
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
                <p>{user.username}</p>
                <EditMemberAccessForm user={user} />
            </AlertDialogContent>
        </AlertDialog>
    );
}
