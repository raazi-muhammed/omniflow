import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import API from "@/lib/client";
import { IProject } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";

async function getProject(id: string) {
    const api = new API();

    const response = await api.project().get(`/get-project/${id}`, {
        headers: { Cookie: cookies().toString() },
    });
    return response.data as IProject;
}

export default async function page({ params }: { params: { id: string } }) {
    const project: IProject = await getProject(params.id);
    return (
        <main>
            <div className="mt-12"></div>
            <Container>
                {project ? (
                    <>
                        <small>Title</small>
                        <Heading>{project.title}</Heading>
                        <br />
                        <small>Description</small>
                        <p>{project.description}</p>
                        <br />
                        <small>Start Date</small>
                        <p>{moment(project.startDate).format("LL")}</p>
                        <br />
                        <small>Due Date</small>
                        <p>{moment(project.dueDate).format("LL")}</p>
                    </>
                ) : (
                    <p>loading</p>
                )}
            </Container>
        </main>
    );
}
