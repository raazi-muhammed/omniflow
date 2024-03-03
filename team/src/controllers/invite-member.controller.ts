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
import { ICreateNameFromEmail } from "../interfaces/utils.interface.js";

const { CLIENT_URL } = loadEnv(["CLIENT_URL"]);

export default function buildInviteMemberController({
    memberRepository,
    teamRepository,
    addMemberUseCase,
    createNameFromEmail,
    token,
}: {
    addMemberUseCase: IAddMemberUseCase;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
    createNameFromEmail: ICreateNameFromEmail;
    token: IToken<{ projectId: string; memberId: string }>;
}) {
    return async (req: IRequest) => {
        const { currentUser, currentProject, body } = req;
        validateBody(body, ["email"]);
        const userEmail = body.email;

        if (!currentUser) throw new UserUnauthorizedError();
        if (!currentProject) {
            throw new UnauthorizedError("Project not authorized");
        }

        let userToInvite = await memberRepository.getByEmail(userEmail);

        if (!userToInvite) {
            const placeHolder = createNameFromEmail(userEmail);
            const memberToAdd = addMemberUseCase({
                email: userEmail,
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

        const tokenData = {
            projectId: currentProject._id,
            memberId: userToInvite._id,
        };

        const inviteToken = token.sign(tokenData);
        const url = `${CLIENT_URL}/invitation?token=${inviteToken}`;

        console.log({ inviteToken, url });

        const response = new ReposeCreator();
        return response.setStatusCode(201).setMessage("User invited");
    };
}
