import {
    IMember,
    IMemberEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildAddMemberToProjectUseCase({
    projectRepository,
    memberRepository,
    MemberCreator,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
    MemberCreator: IMemberEntityConstructor;
}) {
    return async ({
        userData,
        projectId,
    }: {
        userData: IMember;
        projectId: string;
    }) => {
        const member = new MemberCreator(userData);
        const user = member.get();

        const userFound = await memberRepository.upsert(user);

        await projectRepository.addMember({
            projectId,
            member: {
                role: Role.DEFAULT,
                inviteStatus: InviteStatus.ACCEPTED,
                info: userFound.id,
            },
        });
    };
}
