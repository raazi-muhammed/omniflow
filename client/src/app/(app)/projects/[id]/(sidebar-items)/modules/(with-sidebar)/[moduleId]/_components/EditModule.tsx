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
import { ModuleService } from "@/services/api/module.service";
import { makeApiCall } from "@/lib/apicaller";
import AnimateButton from "@/components/animated/AnimateButton";

export default function EditModule({ module }: { module: IModule }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const closeModel = () => setOpen(false);
    function handleDelete() {
        const service = new ModuleService();

        makeApiCall(() => service.deleteModule(module.id).exec(), {
            toast,
            afterSuccess: () => {
                setOpen(false);
                router.refresh();
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
                        Edit module
                    </Button>
                </AnimateButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card">
                <DialogHeader>
                    <DialogTitle>Edit module</DialogTitle>
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
