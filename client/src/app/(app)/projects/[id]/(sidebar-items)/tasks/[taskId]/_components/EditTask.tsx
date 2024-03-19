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
import { ITask } from "@/types/database";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditTaskForm from "../_forms/EditTaskFrom";
import { DeleteTask } from "./DeleteTask";
import { deleteTask } from "@/services/task.service";

export default function EditTask({ task }: { task: ITask }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    function handleDelete() {
        deleteTask({ id: task.id })
            .then((response) => {
                toast({
                    description: response.message,
                });
                router.refresh();
                setOpen(false);
                router.back();
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
                    Edit task
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card">
                <DialogHeader>
                    <DialogTitle>Edit endpoint</DialogTitle>
                </DialogHeader>
                <EditTaskForm
                    handleDelete={handleDelete}
                    setOpen={setOpen}
                    task={task}
                />
            </DialogContent>
        </Dialog>
    );
}
