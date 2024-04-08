import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { ITask } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import TaskBoard from "./_components/TaskBoard";
import { TaskService } from "@/services/api/task.service";
import AnimateButton from "@/components/animated/AnimateButton";

async function loadTasks() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TaskService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getTasks().exec();
    return response.data as ITask[];
}

export default async function page() {
    const data: ITask[] = await loadTasks();
    const tasks = {
        onProgress: data.filter((d) => d.status == "ON_PROGRESS"),
        completed: data.filter((d) => d.status == "COMPLETED"),
        toDo: data.filter((d) => d.status == "TO_DO"),
    };

    return (
        <section>
            <section className="mt-8">
                <Container className="flex justify-between">
                    <Heading>Tasks</Heading>
                    <AnimateButton>
                        <Link href="tasks/add" legacyBehavior>
                            <Button size="sm">
                                <AddIcon />
                                Add task
                            </Button>
                        </Link>
                    </AnimateButton>
                </Container>
            </section>
            <main className="w-screen-without-sidebar min-h-screen overflow-auto">
                <Container className="flex gap-4">
                    <TaskBoard tasks={tasks.toDo} header={{ value: "TO_DO" }} />
                    <TaskBoard
                        tasks={tasks.onProgress}
                        header={{ value: "ON_PROGRESS" }}
                    />
                    <TaskBoard
                        tasks={tasks.completed}
                        header={{ value: "COMPLETED" }}
                    />
                </Container>
            </main>
        </section>
    );
}
