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
import { IEndpoint, ITask } from "@/types/database";
import { useState } from "react";
import { removeEndpoint } from "@/services/endpoints.service";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditTaskForm from "../_forms/EditTaskFrom";

export default function EditTask({ task }: { task: ITask }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    /* function handleDelete() {
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
    } */

    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button variant="muted" size="sm">
                    <EditIcon />
                    Edit task
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card">
                <DialogHeader>
                    <DialogTitle>Edit endpoint</DialogTitle>
                </DialogHeader>
                <EditTaskForm setOpen={setOpen} task={task} />
            </DialogContent>
        </Dialog>
    );
}
