import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddIcon } from "@/lib/icons";
import { IProject } from "@/types/database";
import Link from "next/link";
import { cookies } from "next/headers";
import { getProjects } from "@/services/project.service";
import ResponsiveGridContainer from "@/components/layout/ResponsiveGridContainer";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { USER_TOKEN_COOKIE } from "@/constants/cookies";

export async function getProjectsData() {
    const token = cookies().get(USER_TOKEN_COOKIE)?.value;

    const response = await getProjects({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log({ response });

    return response?.data as IProject[];
}

export default async function page() {
    const projects: IProject[] = await getProjectsData();

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
            {projects.length <= 0 && (
                <ErrorMessage>No projected found</ErrorMessage>
            )}
            <ResponsiveGridContainer>
                {projects.map((project) => (
                    <Link href={`/projects/${project._id}`}>
                        <Card>
                            <CardHeader className="text-secondary">
                                <p className="text-xl font-semibold text-foreground">
                                    {project.title}
                                </p>
                                <small className="line-clamp-3">
                                    {project.description}
                                </small>
                            </CardHeader>
                            <CardContent className="flex">
                                <section className="ms-auto flex gap-2">
                                    {project.members.map((member) => (
                                        <Avatar
                                            tooltip={true}
                                            name={member.info.name}
                                            email={member.info.email}
                                            size="sm"
                                            src={member.info.avatar || ""}
                                        />
                                    ))}
                                </section>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </ResponsiveGridContainer>
        </Container>
    );
}
