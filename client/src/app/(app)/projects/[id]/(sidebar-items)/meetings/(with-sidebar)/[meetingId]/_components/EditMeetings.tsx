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
import { IMeeting } from "@/types/database";
import EditMeetingForm from "../_forms/EditMeetingFrom";

export function EditMeeting({ meeting }: { meeting: IMeeting }) {
    const [open, setOpen] = useState(false);
    const closeDialog = () => setOpen(false);
    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button size="sm" variant="muted">
                    <EditIcon />
                    Edit meetings
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Meetings</DialogTitle>
                </DialogHeader>
                <EditMeetingForm closeDialog={closeDialog} meeting={meeting} />
            </DialogContent>
        </Dialog>
    );
}
