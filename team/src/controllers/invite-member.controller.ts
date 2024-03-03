import {
    IRequest,
    UserUnauthorizedError,
    UnauthorizedError,
    validateBody,
    AnErrorOccurredError,
    ReposeCreator,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { IAddMemberUseCase } from "../interfaces/use-case.interface.js";
import { InviteStatus, Role } from "../interfaces/entity.interface.js";
import { ICreateNameFromEmail } from "../interfaces/utils.interface.js";

export default function buildInviteMemberController({
    memberRepository,
    teamRepository,
    addMemberUseCase,
    createNameFromEmail,
}: {
    addMemberUseCase: IAddMemberUseCase;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
    createNameFromEmail: ICreateNameFromEmail;
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

        const response = new ReposeCreator();
        return response.setStatusCode(201).setMessage("User invited");
    };
}
