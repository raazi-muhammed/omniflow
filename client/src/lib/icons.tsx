import { Pencil, Plus } from "lucide-react";

export function AddIcon({ type }: { type?: "default" | "icon" | "condensed" }) {
    switch (type) {
        case "icon":
            return <Plus size="1.2em" className="" />;
        case "default":
            return <Plus size="1.2em" className="-ms-1 me-2" />;
        case "condensed":
            return <Plus size="1.2em" className="w-10" />;
        default:
            return <Plus size="1.2em" className="-ms-1 me-2" />;
    }
}
export function EditIcon() {
    return <Pencil size="1.1em" className="-ms-1 me-2" />;
}
