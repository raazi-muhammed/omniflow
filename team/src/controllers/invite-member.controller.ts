import {
    IRequest,
    validateBody,
    AnErrorOccurredError,
    ResponseCreator,
    IToken,
    loadEnv,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { IAddMemberUseCase } from "../interfaces/use-case.interface.js";
import { InviteStatus, Role } from "../interfaces/entity.interface.js";
import {
    ICreateNameFromEmail,
    InvitationTokenData,
} from "../interfaces/utils.interface.js";
import { IMailService } from "../lib/send-invitation-mail.js";

const { CLIENT_URL } = loadEnv(["CLIENT_URL"]);

export default function buildInviteMemberController({
    memberRepository,
    teamRepository,
    addMemberUseCase,
    token,
    mailService,
}: {
    addMemberUseCase: IAddMemberUseCase;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
    createNameFromEmail: ICreateNameFromEmail;
    token: IToken<InvitationTokenData>;
    mailService: IMailService;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const userInput = req.body;
        validateBody(userInput, ["email", "message", "username", "name"]);

        let userToInvite = await memberRepository.getByEmail(userInput.email);

        if (!userToInvite) {
            const memberToAdd = addMemberUseCase({
                email: userInput.email,
                username: userInput.username,
                name: userInput.name,
                avatar: userInput?.avatar,
            });

            userToInvite = await memberRepository.upsert(memberToAdd);
            if (!userToInvite) {
                throw new AnErrorOccurredError();
            }
        }

        const team = await teamRepository.getDefaultTeam({
            projectId: currentProject.id,
        });

        const newTeam = await teamRepository.addMember({
            teamId: team.id,
            member: {
                role: Role.DEFAULT,
                inviteStatus: InviteStatus.PENDING,
                info: userToInvite.id,
            },
        });

        console.log({ newTeam });

        const tokenData: InvitationTokenData = {
            projectId: currentProject.id,
            memberId: userToInvite.id,
            message: userInput.message,
        };

        const inviteToken = token.sign(tokenData);
        const url = `${CLIENT_URL}/invitation?token=${inviteToken}&message=${userInput.message}`;

        console.log({ inviteToken, url });

        mailService.sendInvitationEmail({
            email: userToInvite.email,
            message: userInput.message,
            invitationLink: url,
        });

        const response = new ResponseCreator();
        return response.setStatusCode(201).setMessage("User invited");
    };
}
