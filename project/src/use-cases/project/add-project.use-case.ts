import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";
import {
    AccessLevels,
    IMember,
    IProjectEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import { ITeamProducers } from "../../interfaces/broker.interface.js";
import { IUser } from "@omniflow/common/dist/interfaces/entity.interface.js";

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
        member: IUser;
        projectData: {
            title: string;
            description: string;
            dueDate: Date;
            startDate: Date;
            priority: number;
        };
    }) => {
        let projectLead = await memberRepository.getByEmail(member.email);
        if (!projectLead) {
            projectLead = await memberRepository.add({
                email: member.email,
                avatar: member.avatar,
                name: member.name,
                username: member.username,
                role: Role.TEAM_LEAD,
                access: {
                    apiDoc: AccessLevels.CAN_EDIT,
                    module: AccessLevels.CAN_EDIT,
                    dbDesign: AccessLevels.CAN_EDIT,
                },
            } as IMember);
        }

        const projectEntity = new ProjectCreator({
            ...projectData,
            lead: projectLead.id,
            members: [
                {
                    role: Role.DEFAULT,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: projectLead.id,
                    access: {
                        apiDoc: AccessLevels.CAN_EDIT,
                        dbDesign: AccessLevels.CAN_EDIT,
                        module: AccessLevels.CAN_EDIT,
                    },
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
