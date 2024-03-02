import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import API from "@/lib/client";
import { AddIcon } from "@/lib/icons";
import { IProject } from "@/types/database";
import Link from "next/link";
import { cookies } from "next/headers";

export async function getProjects() {
    const api = new API();
    const response = await api
        .project()
        .get("/get-projects", { headers: { Cookie: cookies().toString() } });
    return response?.data;
}

export default async function page() {
    const projects: IProject[] = await getProjects();

    return (
        <Container>
            <section className="my-8 ms-auto flex w-fit gap-2">
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
                                    <p className="text-xl font-semibold text-foreground">
                                        {project.title}
                                    </p>
                                    <small>{project.description}</small>
                                    <small>
                                        Lead: {project.projectLead?.name}
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