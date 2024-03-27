"use client";
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import { removeTable } from "@/services/table.service";

export default function DeleteTable({ tableId }: { tableId: string }) {
    function handleDelete() {
        removeTable({ tableId });
    }
    return <DeleteAlert handleDelete={handleDelete} />;
}
