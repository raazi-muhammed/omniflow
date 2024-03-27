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
import { makeApiCall } from "@/lib/apicaller";
import { TableService } from "@/services/api/table.service";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function RemoveRelation({
    relationId,
    refreshRelations,
}: {
    relationId: string;
    refreshRelations: () => void;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    function handleRemoveMember() {
        const service = new TableService();
        makeApiCall(() => service.removeRelation(relationId).exec(), {
            toast,
            afterSuccess: () => {
                setOpen(false);
                refreshRelations();
            },
        });
    }
    return (
        <AlertDialog open={open} onOpenChange={(e) => setOpen(e)}>
            <AlertDialogTrigger asChild>
                <Button
                    size="actionIcon"
                    variant="destructiveFlat"
                    className="pointer-events-auto opacity-5 hover:opacity-100">
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
