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
import { ApiDocService } from "@/services/api/api-doc.service";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveResponse({
    responseId,
    endpointId,
}: {
    responseId: string;
    endpointId: string;
}) {
    const { toast } = useToast();
    const router = useRouter();
    function handleRemoveMember() {
        const service = new ApiDocService();
        makeApiCall(
            () => service.removeEndpointResponse(endpointId, responseId).exec(),
            { toast, afterSuccess: () => router.refresh() }
        );
    }
    return (
        <AlertDialog>
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
