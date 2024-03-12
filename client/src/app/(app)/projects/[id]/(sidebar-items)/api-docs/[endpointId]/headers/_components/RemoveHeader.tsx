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
import { removeEndpointHeader } from "@/services/endpoints.service";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveHeader({
    endpointId,
    headerId,
}: {
    endpointId: string;
    headerId: string;
}) {
    const { toast } = useToast();
    const router = useRouter();
    function handleRemoveMember() {
        removeEndpointHeader({ headerId, endpointId })
            .then((response) => {
                toast({
                    description: response.message,
                });
                router.refresh();
            })
            .catch((error) => {
                toast({
                    description: error,
                });
            });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="actionIcon" variant="destructiveFlat">
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
