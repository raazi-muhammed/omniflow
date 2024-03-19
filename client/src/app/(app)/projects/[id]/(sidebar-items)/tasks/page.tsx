import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getTasks } from "@/services/task.service";
import { ITask } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import TaskCard from "./_components/TaskCard";
import ErrorMessage from "@/components/custom/ErrorMessage";

async function loadTasks() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getTasks({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
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
                    <Link href="tasks/add" legacyBehavior>
                        <Button size="sm">
                            <AddIcon />
                            Add task
                        </Button>
                    </Link>
                </Container>
            </section>
            <main className="w-screen-without-sidebar min-h-screen overflow-auto">
                <Container className="flex gap-4">
                    <section className="w-80 flex-shrink-0 space-y-4">
                        <Heading variant="sm">Todo</Heading>
                        {tasks.toDo.map((task) => (
                            <TaskCard task={task} />
                        ))}
                        {tasks.toDo.length < 1 && (
                            <ErrorMessage
                                type="info"
                                className="-ms-2"
                                message="No items on todo"
                            />
                        )}
                    </section>
                    <section className="w-80 flex-shrink-0 space-y-4">
                        <Heading variant="sm">On Progress</Heading>
                        {tasks.onProgress.map((task) => (
                            <TaskCard task={task} />
                        ))}
                        {tasks.onProgress.length < 1 && (
                            <ErrorMessage
                                type="info"
                                className="-ms-2"
                                message="No items on progress"
                            />
                        )}
                    </section>
                    <section className="w-80 flex-shrink-0 space-y-4">
                        <Heading variant="sm">Completed</Heading>
                        {tasks.completed.map((task) => (
                            <TaskCard task={task} />
                        ))}
                        {tasks.completed.length < 1 && (
                            <ErrorMessage
                                type="info"
                                className="-ms-2"
                                message="No items are completed"
                            />
                        )}
                    </section>
                </Container>
            </main>
        </section>
    );
}
