import {
    AnErrorOccurredError,
    IRequest,
    ResponseCreator,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";

export default function buildChangeTeamLeadController({
    memberRepository,
    teamRepository,
}: {
    memberRepository: IMemberRepository;
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputBody = req.body;
        validateBody(inputBody, ["lead", "teamName"]);

        const userFound = await memberRepository.getByEmail(inputBody.lead);
        if (!userFound) throw new UserNotFoundError();

        const teamLeadChanged = await teamRepository.changeTeamLead({
            projectId: currentProject._id,
            teamName: inputBody.teamName,
            userId: String(userFound._id),
        });

        if (!teamLeadChanged) {
            throw new AnErrorOccurredError("Changing team lead failed");
        }

        const response = new ResponseCreator();
        return response.setMessage("Team lead changed");
    };
}
