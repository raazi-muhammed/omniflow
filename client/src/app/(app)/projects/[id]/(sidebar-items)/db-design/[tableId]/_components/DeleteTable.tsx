"use client";
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import { TableService } from "@/services/api/table.service";

export default function DeleteTable({ tableId }: { tableId: string }) {
    const { toast } = useToast();

    function handleDelete() {
        const service = new TableService();
        makeApiCall(() => service.removeTable(tableId).exec(), { toast });
    }
    return <DeleteAlert handleDelete={handleDelete} />;
}
