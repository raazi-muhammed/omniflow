import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getTasks } from "@/services/task.service";
import { ITask } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";
import TaskCard from "../_components/TaskCard";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";

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

export default async function page({ children }: { children: ReactNode }) {
    const data: ITask[] = await loadTasks();

    const tasks = {
        onProgress: data.filter((d) => d.status == "ON_PROGRESS"),
        completed: data.filter((d) => d.status == "COMPLETED"),
        toDo: data.filter((d) => d.status == "TO_DO"),
    };

    return (
        <Container>
            <SectionSplitter className="w-full">
                <SectionAside className="mt-8">
                    <section className="flex justify-between">
                        <Link href="add" legacyBehavior>
                            <Button className="ms-auto" size="sm">
                                <AddIcon />
                                Add task
                            </Button>
                        </Link>
                    </section>
                    <main className="w-full space-y-6">
                        {tasks.toDo.length > 0 && (
                            <section className="w-full space-y-4">
                                <Heading variant="sm">Todo</Heading>
                                {tasks.toDo.map((task) => (
                                    <TaskCard
                                        onHomeScreen={false}
                                        task={task}
                                    />
                                ))}
                            </section>
                        )}
                        {tasks.onProgress.length > 0 && (
                            <section className="w-full space-y-4">
                                <Heading variant="sm">On Progress</Heading>
                                {tasks.onProgress.map((task) => (
                                    <TaskCard
                                        onHomeScreen={false}
                                        task={task}
                                    />
                                ))}
                            </section>
                        )}
                        {tasks.completed.length > 0 && (
                            <section className="w-full space-y-4">
                                <Heading variant="sm">Completed</Heading>
                                {tasks.completed.map((task) => (
                                    <TaskCard
                                        onHomeScreen={false}
                                        task={task}
                                    />
                                ))}
                            </section>
                        )}
                    </main>
                </SectionAside>
                <SectionContent>{children}</SectionContent>
            </SectionSplitter>
        </Container>
    );
}
