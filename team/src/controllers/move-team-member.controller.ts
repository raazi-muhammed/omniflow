import {
    IRequest,
    ResponseCreator,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { InviteStatus, Role } from "../interfaces/entity.interface.js";

export default function buildMoveMemberToTeamController({
    teamRepository,
    memberRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputData = req.body;

        validateBody(inputData, ["toTeam", "fromTeam", "email"]);

        const user = await memberRepository.getByEmail(inputData.email);
        if (!user) throw new UserNotFoundError();

        await teamRepository.addMemberToTeam({
            projectId: currentProject._id,
            teamName: inputData.toTeam,
            member: {
                inviteStatus: InviteStatus.ACCEPTED,
                role: Role.DEFAULT,
                info: user._id,
            },
        });
        await teamRepository.removeMemberFromTeam({
            projectId: currentProject._id,
            teamName: inputData.fromTeam,
            memberId: String(user._id),
        });

        const response = new ResponseCreator();
        return response.setMessage("Member moved");
    };
}
