import Heading from "@/components/custom/Heading";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
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
import { Card } from "@/components/ui/card";
import { formatConstants } from "@/lib/formaters";
import Avatar from "@/components/custom/Avatar";
import { TaskService } from "@/services/api/task.service";

async function loadTask(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TaskService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.getTask(id).exec();
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
            <section>
                <Label>Status</Label>
                <p>{formatConstants(task.status)}</p>
                <br />
                {task.assignee ? (
                    <>
                        <Label>Assignee</Label>
                        <Card className="flex gap-3 p-4">
                            <Avatar
                                src={task.assignee.avatar || ""}
                                name={task.assignee.name}
                            />
                            <div className="grid gap-0">
                                <p>{task.assignee.name}</p>
                                <Label>{task.assignee.email}</Label>
                            </div>
                        </Card>
                        <br />
                    </>
                ) : null}
                <Label>Reporter</Label>
                <Card className="flex gap-3 p-4">
                    <Avatar
                        src={task.reporter.avatar || ""}
                        name={task.reporter.name}
                    />
                    <div className="grid gap-0">
                        <p>{task.reporter.name}</p>
                        <Label>{task.reporter.email}</Label>
                    </div>
                </Card>
            </section>
        </section>
    );
}
