import {
    IRequest,
    UserUnauthorizedError,
    UnauthorizedError,
    validateBody,
    AnErrorOccurredError,
    ReposeCreator,
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
    createNameFromEmail,
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
        const { currentUser, currentProject } = req;
        const userInput = req.body;
        validateBody(userInput, ["email", "message"]);

        if (!currentUser) throw new UserUnauthorizedError();
        if (!currentProject) {
            throw new UnauthorizedError("Project not authorized");
        }

        let userToInvite = await memberRepository.getByEmail(userInput.email);

        if (!userToInvite) {
            const placeHolder = createNameFromEmail(userInput.email);
            const memberToAdd = addMemberUseCase({
                email: userInput.email,
                username: placeHolder.username,
                name: placeHolder.name,
            });

            userToInvite = await memberRepository.upsert(memberToAdd);
            if (!userToInvite) {
                throw new AnErrorOccurredError();
            }
        }

        const team = await teamRepository.getDefaultTeam({
            projectId: currentProject._id,
        });

        const newTeam = await teamRepository.addMember({
            teamId: team._id,
            member: {
                role: Role.DEFAULT,
                inviteStatus: InviteStatus.PENDING,
                info: userToInvite._id,
            },
        });

        console.log({ newTeam });

        const tokenData: InvitationTokenData = {
            projectId: currentProject._id,
            memberId: String(userToInvite._id),
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

        const response = new ReposeCreator();
        return response.setStatusCode(201).setMessage("User invited");
    };
}
