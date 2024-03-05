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

export default function buildRemoveMemberFromTeamController({
    teamRepository,
    memberRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputData = req.body;

        validateBody(inputData, ["team", "email"]);

        console.log("hooi");

        const user = await memberRepository.getByEmail(inputData.email);
        if (!user) throw new UserNotFoundError();

        await teamRepository.removeMemberFromTeam({
            projectId: currentProject._id,
            teamName: inputData.team,
            memberId: String(user._id),
        });

        const response = new ResponseCreator();
        return response.setMessage("Member removed");
    };
}
