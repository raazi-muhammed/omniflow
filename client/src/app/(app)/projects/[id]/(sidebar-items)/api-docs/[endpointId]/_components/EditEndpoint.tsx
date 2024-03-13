"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "@/lib/icons";
import EditEndpointForm from "./EditEndpointForm";
import { IEndpoint } from "@/types/database";
import { useState } from "react";
import { removeEndpoint } from "@/services/endpoints.service";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function EditEndpoint({ endpoint }: { endpoint: IEndpoint }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    function handleDelete() {
        removeEndpoint({ id: endpoint.id })
            .then((response) => {
                toast({
                    description: response.message,
                });
                setOpen(false);
                router.back();
                router.refresh();
            })
            .catch((error) => {
                toast({
                    description: error,
                });
            });
    }

    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button variant="muted" size="sm">
                    <EditIcon />
                    Edit endpoint
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card">
                <DialogHeader>
                    <DialogTitle>Edit endpoint</DialogTitle>
                </DialogHeader>
                <EditEndpointForm
                    handleDelete={handleDelete}
                    setOpen={setOpen}
                    endpoint={endpoint}
                />
            </DialogContent>
        </Dialog>
    );
}
