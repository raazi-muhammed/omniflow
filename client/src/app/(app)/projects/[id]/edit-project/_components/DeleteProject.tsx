"use client";

import { DeleteAlert } from "@/components/custom/DeleteAlert";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import { ProjectService } from "@/services/api/project.service";
import { useRouter } from "next/navigation";

export default function DeleteProject() {
    const { toast } = useToast();
    const router = useRouter();
    function handleDeleteProject() {
        const service = new ProjectService();
        makeApiCall(() => service.deleteProject().exec(), {
            toast,
            afterSuccess: () => {
                router.push("/projects");
                router.refresh();
            },
        });
    }
    return <DeleteAlert handleDelete={handleDeleteProject} />;
}
