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
import { TaskService } from "@/services/api/task.service";
import { makeApiCall } from "@/lib/apicaller";
import AnimateButton from "@/components/animated/AnimateButton";

export default function EditTask({ task }: { task: ITask }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    function handleDelete() {
        const service = new TaskService();
        makeApiCall(() => service.deleteTask(task.id).exec(), {
            toast,
            afterSuccess: () => {
                router.refresh();
                setOpen(false);
                router.back();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger>
                <AnimateButton>
                    <Button variant="muted" size="sm">
                        <EditIcon />
                        Edit task
                    </Button>
                </AnimateButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card">
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
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
