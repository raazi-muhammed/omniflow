import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getTasks } from "@/services/task.service";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function loadTasks() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getTasks({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    return response.data;
}

export default async function page() {
    const data = await loadTasks();
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
            <p className="text-pretty">{JSON.stringify(data)}</p>
        </Container>
    );
}
