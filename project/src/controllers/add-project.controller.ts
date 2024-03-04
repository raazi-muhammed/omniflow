import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../interfaces/repository.interface.js";
import { IAddProjectUseCase } from "../interfaces/use-case.interface.js";
import {
    IMember,
    IProject,
    InviteStatus,
    Role,
} from "../interfaces/entity.interface.js";

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
        const currentUser = req.currentUser;

        validateBody(projectData, [
            "title",
            "description",
            "dueDate",
            "startDate",
            "priority",
        ]);

        const addProjectData = sanitizeProjectData(projectData);

        const projectLead = await memberRepository.upsert({
            email: currentUser.email,
            avatar: currentUser.avatar,
            name: currentUser.name,
            username: currentUser.username,
            role: Role.TEAM_LEAD,
        } as IMember);

        const project = await addProjectUseCase({
            ...addProjectData,
            projectLead: projectLead._id,
            members: [
                {
                    role: Role.TEAM_LEAD,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: projectLead._id,
                },
            ],
        });

        const projectAdded = await projectRepository.add(project);

        if (!projectAdded) throw new Error("Cannot add project to db");

        const response = new ResponseCreator();
        return response
            .setData(project)
            .setStatusCode(201)
            .setMessage("Project added");
    };
}
