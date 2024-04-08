import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AddIcon } from "@/lib/icons";
import AddNoteForm from "../_forms/AddNoteForm";
import AnimateButton from "@/components/animated/AnimateButton";

export function AddNote({ moduleId }: { moduleId: string }) {
    return (
        <Dialog>
            <DialogTrigger>
                <AnimateButton>
                    <Button size="sm" variant="muted">
                        <AddIcon />
                        Add note
                    </Button>
                </AnimateButton>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <AddNoteForm moduleId={moduleId} />
            </DialogContent>
        </Dialog>
    );
}
