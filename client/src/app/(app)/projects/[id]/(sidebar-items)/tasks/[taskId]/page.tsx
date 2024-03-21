import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getTask } from "@/services/task.service";
import { ITask } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import React from "react";
import EditTask from "./_components/EditTask";
import {
    PreviewActions,
    PreviewAside,
    PreviewContent,
    PreviewHeader,
} from "@/components/layout/PreviewHeader";

async function loadTask(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getTask(
        { id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data as ITask;
}

export default async function Task({ params }: { params: { taskId: string } }) {
    const task: ITask = await loadTask(params.taskId);

    return (
        <section className="space-y-6">
            <PreviewActions>
                <EditTask task={task} />
            </PreviewActions>
            <PreviewHeader>
                <PreviewContent>
                    <Heading>{task.name}</Heading>
                    <Label>Description</Label>
                    <p>{task.description}</p>
                </PreviewContent>
                <PreviewAside>
                    <div>
                        <Label>Start Date</Label>
                        <p>{moment(task.startDate).format("LL")}</p>
                    </div>
                    <div>
                        <Label>Due Date</Label>
                        <p>{moment(task.dueDate).format("LL")}</p>
                    </div>
                </PreviewAside>
            </PreviewHeader>
            <Separator />
            <p>{task.status}</p>
        </section>
    );
}
