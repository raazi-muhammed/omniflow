"use client";

import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { EditIcon } from "@/lib/icons";
import { setProject as setProjectOnRedux } from "@/redux/features/projectSlice";
import { AppDispatch } from "@/redux/store";
import { getProject } from "@/services/project.service";
import { IProject } from "@/types/database";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<IProject | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        getProject({ id: params.id }).then((response) => {
            setProject(response.data);
            dispatch(setProjectOnRedux(response.data as IProject));
        });
    }, []);
    return (
        <main className="w-full">
            <Container>
                <ActionItemsContainer>
                    <Link href={`${project?._id}/edit-project`}>
                        <Button size="sm" variant="secondary">
                            <EditIcon /> Edit Project
                        </Button>
                    </Link>
                </ActionItemsContainer>
                {project ? (
                    <>
                        <small className="text-secondary">Title</small>
                        <Heading>{project.title}</Heading>
                        <br />
                        <small className="text-secondary">Description</small>
                        <p className="max-w-2xl">{project.description}</p>
                        <br />
                        <small className="text-secondary">Start Date</small>
                        <p>{moment(project.startDate).format("LL")}</p>
                        <br />
                        <small className="text-secondary">Due Date</small>
                        <p>{moment(project.dueDate).format("LL")}</p>
                        <br />
                        <small className="text-secondary">Team Lead</small>
                        <div className="flex gap-3">
                            <div className="my-auto">
                                <Avatar
                                    name={project.projectLead.name}
                                    src={project.projectLead.avatar || ""}
                                />
                            </div>
                            <div>
                                <p>{project.projectLead.name}</p>
                                <small>{project.projectLead.email}</small>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>loading</p>
                )}
            </Container>
        </main>
    );
}
