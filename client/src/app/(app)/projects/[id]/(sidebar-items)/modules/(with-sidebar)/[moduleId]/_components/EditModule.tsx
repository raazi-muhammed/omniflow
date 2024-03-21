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
import { IModule } from "@/types/database";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditModuleForm from "../_forms/EditModuleForm";
import { deleteModule } from "@/services/module.service";

export default function EditModule({ module }: { module: IModule }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const closeModel = () => setOpen(false);
    function handleDelete() {
        deleteModule({ id: module.id })
            .then((response) => {
                toast({
                    description: response.message,
                });
                setOpen(false);
                router.refresh();
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
                <EditModuleForm
                    module={module}
                    handleDelete={handleDelete}
                    closeModel={closeModel}
                />
            </DialogContent>
        </Dialog>
    );
}
