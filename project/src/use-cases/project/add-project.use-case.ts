import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";
import {
    IMember,
    IProjectEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import { ITeamProducers } from "../../interfaces/broker.interface.js";

export default function buildAddProjectUseCase({
    projectRepository,
    memberRepository,
    ProjectCreator,
    teamProducers,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
    ProjectCreator: IProjectEntityConstructor;
    teamProducers: ITeamProducers;
}) {
    return async ({
        member,
        projectData,
    }: {
        member: IMember;
        projectData: {
            title: string;
            description: string;
            dueDate: Date;
            startDate: Date;
            priority: number;
        };
    }) => {
        const projectLead = await memberRepository.upsert({
            email: member.email,
            avatar: member.avatar,
            name: member.name,
            username: member.username,
            role: Role.TEAM_LEAD,
        } as IMember);

        const projectEntity = new ProjectCreator({
            ...projectData,
            lead: projectLead._id,
            members: [
                {
                    role: Role.DEFAULT,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: projectLead._id,
                },
            ],
            isDeleted: false,
        });
        projectEntity.validate();
        const project = projectEntity.get();

        const projectAdded = await projectRepository.add(project);
        if (!projectAdded) throw new Error("Cannot add project to db");

        await teamProducers.addMemberToTeam({
            userData: {
                email: projectLead.email,
                username: projectLead.username,
                avatar: projectLead.avatar,
            },
            projectId: projectAdded.id,
        });

        return projectAdded;
    };
}
