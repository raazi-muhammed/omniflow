import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddIcon } from "@/lib/icons";
import { IProject } from "@/types/database";
import Link from "next/link";
import { cookies } from "next/headers";
import { ProjectService } from "@/services/api/project.service";
import ResponsiveGridContainer from "@/components/layout/ResponsiveGridContainer";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { USER_TOKEN_COOKIE } from "@/constants/cookies";
import { Label } from "@/components/ui/label";
import AnimateCard from "@/components/animated/AnimateCard";

async function getProjectsData() {
    const token = cookies().get(USER_TOKEN_COOKIE)?.value;

    const service = new ProjectService({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const response = await service.getProjects().exec();

    return response.data as IProject[];
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
                <ErrorMessage type="info" message="No projected found" />
            )}
            <ResponsiveGridContainer>
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <AnimateCard>
                            <Card>
                                <CardHeader className="text-secondary">
                                    <p className="text-xl font-semibold text-foreground">
                                        {project.title}
                                    </p>
                                    <Label className="leading-2 line-clamp-3">
                                        {project.description}
                                    </Label>
                                </CardHeader>
                                <CardContent className="flex">
                                    <section className="ms-auto flex gap-2">
                                        {project.members.map((member) => (
                                            <Avatar
                                                key={member.info.id}
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
                        </AnimateCard>
                    </Link>
                ))}
            </ResponsiveGridContainer>
        </Container>
    );
}
