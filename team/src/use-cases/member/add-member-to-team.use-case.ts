import { InviteStatus, Role } from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildAddMemberToTeamUseCase({
    teamRepository,
    memberRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
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

        await teamRepository.addMemberToTeam({
            member: {
                role: Role.PROJECT_LEAD,
                info: leadUser.id,
                inviteStatus: InviteStatus.ACCEPTED,
            },
            teamName: team.name,
            projectId,
        });
    };
}
