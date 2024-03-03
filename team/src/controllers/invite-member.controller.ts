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

export default function buildInviteMemberController({
    memberRepository,
    teamRepository,
    addMemberUseCase,
}: {
    addMemberUseCase: IAddMemberUseCase;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async (req: IRequest) => {
        const { currentUser, currentProject, body } = req;
        validateBody(body, ["email"]);
        const userEmail = body.email;

        if (!currentUser) throw new UserUnauthorizedError();
        if (!currentProject) {
            throw new UnauthorizedError("Project not authorized");
        }

        console.log({ currentProject });

        let userToInvite = await memberRepository.getByEmail(userEmail);
        console.log({ userToInvite });
        if (!userToInvite) {
            const memberToAdd = addMemberUseCase({
                email: userEmail,
                username: "Dummy",
                name: "dummy",
            });

            const userToInvite = await memberRepository.upsert(memberToAdd);
            console.log({ userToInvite });
            if (!userToInvite) {
                throw new AnErrorOccurredError();
            }
        }

        const team = await teamRepository.getDefaultTeam({
            projectId: currentProject._id,
        });

        console.log({ team });

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
