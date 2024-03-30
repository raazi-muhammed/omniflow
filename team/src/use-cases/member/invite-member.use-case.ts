import {
    AnErrorOccurredError,
    ConflictError,
    IToken,
    loadEnv,
} from "@omniflow/common";
import {
    IMemberRepository,
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import {
    IMemberEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import { InvitationTokenData } from "../../interfaces/utils.interface.js";
import { IMailService } from "../../lib/send-invitation-mail.js";

const { CLIENT_URL } = loadEnv(["CLIENT_URL"]);

export default function buildInviteMemberUseCase({
    memberRepository,
    teamRepository,
    token,
    mailService,
    MemberCreator,
    memberStatusRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
    token: IToken<InvitationTokenData>;
    mailService: IMailService;
    MemberCreator: IMemberEntityConstructor;
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({
        email,
        message,
        username,
        avatar,
        projectId,
        name,
    }: {
        email: string;
        message: string;
        username: string;
        avatar?: string;
        projectId: string;
        name: string;
    }) => {
        let userToInvite = await memberRepository.getByEmail(email);

        if (!userToInvite) {
            const memberEntity = new MemberCreator({
                email,
                username,
                name,
                avatar,
            });
            const memberToAdd = memberEntity.get();

            userToInvite = await memberRepository.upsert(memberToAdd);
            if (!userToInvite) {
                throw new AnErrorOccurredError();
            }
        }

        const team = await teamRepository.getDefaultTeam({
            projectId,
        });

        const memberAlready = await memberStatusRepository.getMember({
            projectId,
            memberId: userToInvite.id,
        });
        if (memberAlready) {
            throw new ConflictError("User is already invited");
        }

        const memberData = await memberStatusRepository.addMember({
            team: team.id,
            project: projectId,
            role: Role.DEFAULT,
            inviteStatus: InviteStatus.PENDING,
            info: userToInvite.id,
            deletedAt: null,
        });
        console.log({ memberData });

        const tokenData: InvitationTokenData = {
            projectId,
            memberId: userToInvite.id,
            message,
        };

        const inviteToken = token.sign(tokenData);
        const url = `${CLIENT_URL}/invitation?token=${inviteToken}&message=${message}`;

        await mailService.sendInvitationEmail({
            email: userToInvite.email,
            message: message,
            invitationLink: url,
        });
    };
}
