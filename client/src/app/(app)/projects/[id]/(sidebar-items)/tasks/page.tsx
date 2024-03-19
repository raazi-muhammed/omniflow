import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getTasks } from "@/services/task.service";
import { ITask } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import TaskCard from "./_components/TaskCard";

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
    return (
        <Container>
            <section className="mt-8 flex justify-between">
                <Heading>Tasks</Heading>

                <Link href="tasks/add" legacyBehavior>
                    <Button size="sm">
                        <AddIcon />
                        Add task
                    </Button>
                </Link>
            </section>
            <main className="flex gap-4">
                <section className="w-80 space-y-4">
                    <Heading variant="sm">Todo</Heading>
                    {data.map((task) => (
                        <>
                            {task.status == "TO_DO" && <TaskCard task={task} />}
                        </>
                    ))}
                </section>
                <section className="w-80 space-y-4">
                    <Heading variant="sm">On Progress</Heading>
                    {data.map((task) => (
                        <>
                            {task.status == "ON_PROGRESS" && (
                                <TaskCard task={task} />
                            )}
                        </>
                    ))}
                </section>
                <section className="w-80 space-y-4">
                    <Heading variant="sm">Completed</Heading>
                    {data.map((task) => (
                        <>
                            {task.status == "COMPLETED" && (
                                <TaskCard task={task} />
                            )}
                        </>
                    ))}
                </section>
            </main>
        </Container>
    );
}
