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
import EditNoteForm from "../_forms/EditNoteForm";
import { useState } from "react";

export function EditNote({
    meetingId,
    notes,
}: {
    meetingId: string;
    notes: string;
}) {
    const [open, setOpen] = useState(false);
    const closeDialog = () => setOpen(false);
    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button size="sm" variant="muted">
                    <EditIcon />
                    Edit note
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <EditNoteForm
                    closeDialog={closeDialog}
                    notes={notes}
                    meetingId={meetingId}
                />
            </DialogContent>
        </Dialog>
    );
}
