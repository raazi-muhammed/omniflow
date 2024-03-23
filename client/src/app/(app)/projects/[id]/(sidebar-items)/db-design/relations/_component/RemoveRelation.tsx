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
import { useToast } from "@/components/ui/use-toast";
import { removeEndpointResponse } from "@/services/endpoints.service";
import { removeRelations } from "@/services/table.service";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveRelation({ relationId }: { relationId: string }) {
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    function handleRemoveMember() {
        removeRelations({ id: relationId })
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
                <Button
                    size="actionIcon"
                    variant="destructiveFlat"
                    className="ms-auto flex">
                    <Trash2 size="1em" />
                </Button>
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
