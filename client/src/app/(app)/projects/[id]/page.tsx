"use client";

import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { EditIcon } from "@/lib/icons";
import { getProject } from "@/services/project.service";
import { IProject } from "@/types/database";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setProject as setProjectOnRedux } from "@/redux/features/projectSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export default function Page({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<IProject | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        getProject({ id: params.id }).then((response) => {
            setProject(response.data);
            dispatch(setProjectOnRedux(response.data as IProject));
        });
    }, [dispatch, params.id]);

    return (
        <main className="w-full">
            <Container>
                <ActionItemsContainer>
                    <Link href={`${project?.id}/edit-project`}>
                        <Button size="sm" variant="muted">
                            <EditIcon /> Edit Project
                        </Button>
                    </Link>
                </ActionItemsContainer>

                {project ? (
                    <>
                        <Label>Title</Label>
                        <Heading>{project.title}</Heading>
                        <br />
                        <Label>Description</Label>
                        <p className="max-w-2xl">{project.description}</p>
                        <br />
                        <Label>Start Date</Label>
                        <p>{moment(project.startDate).format("LL")}</p>
                        <br />
                        <Label>Due Date</Label>
                        <p>{moment(project.dueDate).format("LL")}</p>
                        <br />
                        <Label>Team Lead</Label>
                        <div className="flex gap-3">
                            <div className="my-auto">
                                <Avatar
                                    name={project.lead?.name}
                                    src={project.lead?.avatar || ""}
                                />
                            </div>
                            <div>
                                <p>{project.lead?.name}</p>
                                <Label>{project.lead?.email}</Label>
                            </div>
                        </div>
                    </>
                ) : (
                    <section className="flex flex-col gap-4">
                        <Skeleton className="h-8 w-36" />
                        <Skeleton className="h-44 w-96" />
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-8 w-44" />
                    </section>
                )}
            </Container>
        </main>
    );
}
