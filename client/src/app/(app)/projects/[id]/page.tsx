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
import { cookies } from "next/headers";

export async function getProjectData(id: string) {
    const response = await getProject(
        { id },
        {
            headers: { Cookie: cookies().toString() },
        }
    );
    return response?.data as IProject;
}

export default async function page({ params }: { params: { id: string } }) {
    const project = await getProjectData(params.id);

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
                            name={project.lead?.name}
                            src={project.lead?.avatar || ""}
                        />
                    </div>
                    <div>
                        <p>{project.lead?.name}</p>
                        <small>{project.lead?.email}</small>
                    </div>
                </div>
            </Container>
        </main>
    );
}
