import { IMember, InviteStatus, Role } from "../interfaces/entity.interface.js";
import {
    IMemberRepository,
    IProjectRepository,
} from "../interfaces/repository.interface.js";
import { ICreateUserUseCase } from "../interfaces/use-case.interface.js";

export default function buildAddMemberToProject({
    projectRepository,
    memberRepository,
    createMember,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
    createMember: ICreateUserUseCase;
}) {
    return async (data: { userData: IMember; projectId: string }) => {
        const user = createMember(data.userData);

        const userFound = await memberRepository.upsert(user);
        console.log({ userFound });

        await projectRepository.addMember({
            projectId: data.projectId,
            member: {
                role: Role.DEFAULT,
                inviteStatus: InviteStatus.ACCEPTED,
                info: userFound._id,
            },
        });
    };
}
