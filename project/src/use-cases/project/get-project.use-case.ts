import { BadRequestError, IToken } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";
import { IProject } from "../../interfaces/entity.interface.js";
import { IUser } from "@omniflow/common/dist/interfaces/entity.interface.js";

export default function buildGetProjectUseCase({
    projectRepository,
    memberRepository,
    token,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
    token: IToken<IProject>;
}) {
    return async ({ projectId, user }: { projectId: string; user: IUser }) => {
        const projectData = await projectRepository.get(projectId);

        const memberInDb = await memberRepository.getByUsername(user.username);

        const data: IProject = {
            description: projectData.description,
            dueDate: projectData.dueDate,
            isDeleted: projectData.isDeleted,
            lead: projectData.lead,
            members: [],
            priority: projectData.priority,
            startDate: projectData.startDate,
            title: projectData.title,
            id: projectData.id,
        };

        let member = projectData.members.find(
            (a) => a.info.id == memberInDb.id
        );

        if (!member) {
            throw new BadRequestError("You are not a member in the team");
        }

        projectData.members.map((m) => {
            console.log({ m: m.info.id, o: memberInDb.id });
        });

        console.log({ member, og: projectData.members });

        const projectToken = token.sign({
            ...data,
            access: member.access,
        });

        return {
            project: projectData,
            token: projectToken,
        };
    };
}
