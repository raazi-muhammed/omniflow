"use client";

import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import API from "@/lib/client";
import { AddIcon } from "@/lib/icons";
import { IProject } from "@/types/database";
import Link from "next/link";
import { useEffect, useState } from "react";

/* export async function getProjects() {
    const api = new API();
    const response = await api.project().get("/get-projects");
    return response?.data;
}
 */
export default function page() {
    // const projects: IProject[] = await getProjects();
    const [projects, setProjects] = useState<IProject[]>([]);
    useEffect(() => {
        const api = new API();
        api.project()
            .get("/get-projects")
            .then((res) => {
                setProjects(res.data);
            });
    }, []);
    return (
        <Container>
            <section className="flex gap-2 ms-auto w-fit my-8">
                <Link href="/projects/add-project">
                    <Button size="sm">
                        <AddIcon />
                        Add a project
                    </Button>
                </Link>
            </section>
            <Heading>Projects</Heading>
            {projects ? (
                <section className="grid grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <Link href={`/projects/${project._id}`}>
                            <Card>
                                <CardHeader className="text-secondary">
                                    <p className="text-xl text-foreground font-semibold">
                                        {project.title}
                                    </p>
                                    <small>{project.description}</small>
                                    <small>
                                        Lead: {project.projectLead.name}
                                    </small>
                                </CardHeader>
                                <CardContent className="flex">
                                    <section className="ms-auto flex gap-2">
                                        {project.members.map((member) => (
                                            <Avatar
                                                size="sm"
                                                src={member.avatar || ""}
                                            />
                                        ))}
                                    </section>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </section>
            ) : (
                <p>No projects</p>
            )}
        </Container>
    );
}
