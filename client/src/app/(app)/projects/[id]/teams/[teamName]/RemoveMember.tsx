"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { removeMember } from "@/services/team.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveMember({
    email,
    team,
}: {
    email: string;
    team: string;
}) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    function handleRemoveMember() {
        removeMember({ email, team })
            .then((response) => {
                toast({
                    description: response.message,
                });
                setOpen(false);
                router.refresh();
            })
            .catch((error) => {
                toast({
                    description: error,
                });
            });
    }
    return (
        <AlertDialog open={open} onOpenChange={(e) => setOpen(e)}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}>
                    Remove
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove this user
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleRemoveMember}>
                        Remove
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
