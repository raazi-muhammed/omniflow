import { IRequest, ReposeCreator, validateBody } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../interfaces/repository.interface.js";
import { IAddProjectUseCase } from "../interfaces/use-case.interface.js";
import { IProject } from "../interfaces/entity.interface.js";

function sanitizeProjectData(projectData: any): IProject {
    projectData.startDate = new Date(projectData.startDate);
    projectData.dueDate = new Date(projectData.dueDate);

    return projectData;
}

export default function buildAddProjectController({
    projectRepository,
    memberRepository,
    addProjectUseCase,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
    addProjectUseCase: IAddProjectUseCase;
}) {
    return async (req: IRequest) => {
        const projectData = req.body;
        if (!projectData.currentUser) throw new Error("Please login");

        console.log({ projectData });

        validateBody(projectData, [
            "title",
            "description",
            "dueDate",
            "startDate",
            "priority",
        ]);

        const addProjectData = sanitizeProjectData(projectData);

        console.log({ addProjectData });

        const projectLead = await memberRepository.upsert(
            projectData.currentUser
        );
        console.log({ projectLead });

        const project = await addProjectUseCase({
            ...addProjectData,
            projectLead: projectLead._id,
            members: [projectLead._id],
        });

        console.log("adding project");

        const projectAdded = await projectRepository.add(project);
        console.log({ projectAdded });

        if (!projectAdded) throw new Error("Cannot add project to db");

        const response = new ReposeCreator();
        return response.setData(project).setStatusCode(201);
    };
}
