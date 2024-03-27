"use client";

import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import { ITask } from "@/types/database";
import TaskCard from "./TaskCard";
import { DragEvent } from "react";
import { makeApiCall } from "@/lib/apicaller";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { formatConstants } from "@/lib/formaters";
import { TaskService } from "@/services/api/task.service";

export default function TaskBoard({
    tasks,
    header,
}: {
    tasks: ITask[];
    header: { value: string };
}) {
    const { toast } = useToast();
    const router = useRouter();
    function handleOnDrop(e: DragEvent<HTMLElement>) {
        const data = e.dataTransfer.getData("id");

        const service = new TaskService();

        makeApiCall(
            () =>
                service
                    .changeTaskStatus({ taskId: data, status: header.value })
                    .exec(),
            {
                toast,
                afterSuccess: () => {
                    router.refresh();
                },
            }
        );
    }

    return (
        <section
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleOnDrop}
            className="w-80 flex-shrink-0 space-y-4 pb-20">
            <Heading variant="sm"> {formatConstants(header.value)}</Heading>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("id", task.id);
                    }}>
                    <TaskCard key={task.id} task={task} />
                </div>
            ))}
            {tasks.length < 1 && (
                <ErrorMessage
                    type="info"
                    className="-ms-2"
                    message={` No items on ${formatConstants(header.value)}`}
                />
            )}
        </section>
    );
}
