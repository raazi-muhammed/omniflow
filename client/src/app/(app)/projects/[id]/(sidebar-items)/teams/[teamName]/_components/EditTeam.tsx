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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { TeamService } from "@/services/api/team.service";
import { makeApiCall } from "@/lib/apicaller";
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import AnimateButton from "@/components/animated/AnimateButton";

export default function EditTeam({ teamName }: { teamName: string }) {
    const [open, setOpen] = useState(false);

    const { toast } = useToast();
    const router = useRouter();
    function handleRemoveMember() {
        const service = new TeamService();
        makeApiCall(() => service.removeTeam({ name: teamName }).exec(), {
            toast,
            afterSuccess: () => {
                router.back();
                router.refresh();
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
                <DeleteAlert handleDelete={handleRemoveMember} />
            </DialogContent>
        </Dialog>
    );
}
