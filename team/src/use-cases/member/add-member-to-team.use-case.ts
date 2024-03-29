import { InviteStatus, Role } from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { memberStatusRepository } from "../../repository/mongo/index.js";

export default function buildAddMemberToTeamUseCase({
    teamRepository,
    memberRepository,
    memberStatusRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({
        member,
        projectId,
    }: {
        member: {
            username: string;
            email: string;
            avatar?: string;
        };
        projectId: string;
    }) => {
        let leadUser = await memberRepository.getByEmail(member.email);

        if (!leadUser) {
            leadUser = await memberRepository.upsert({
                ...member,
                name: member.username,
            });
        }

        const team = await teamRepository.getDefaultTeam({ projectId });

        await memberStatusRepository.addMember({
            role: Role.DEFAULT,
            deletedAt: null,
            team: team.id,
            project: projectId,
            inviteStatus: InviteStatus.PENDING,
            info: leadUser.id,
        });
    };
}
