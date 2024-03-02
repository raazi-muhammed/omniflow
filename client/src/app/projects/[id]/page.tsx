"use client";

import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import API from "@/lib/client";
import { IProject } from "@/types/database";
import moment from "moment";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
    // const project: IProject = await getProject(params.id);
    const [project, setProject] = useState<IProject | null>(null);
    useEffect(() => {
        const api = new API();
        api.project()
            .get(`/get-project/${params.id}`)
            .then((response) => {
                console.log(response);
                setProject(response.data as IProject);
            });
    }, []);
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
