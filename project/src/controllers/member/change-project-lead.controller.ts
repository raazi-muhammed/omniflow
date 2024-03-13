import {
    AnErrorOccurredError,
    IRequest,
    ResponseCreator,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildChangeProjectLeadController({
    memberRepository,
    projectRepository,
}: {
    memberRepository: IMemberRepository;
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputBody = req.body;
        validateBody(inputBody, ["lead"]);

        const userFound = await memberRepository.getByEmail(inputBody.lead);
        if (!userFound) throw new UserNotFoundError();

        const teamLeadChanged = await projectRepository.changeTeamLead({
            projectId: currentProject.id,
            userId: userFound.id,
        });
        if (!teamLeadChanged) {
            throw new AnErrorOccurredError("Changing team lead failed");
        }

        const response = new ResponseCreator();

        return response.setMessage("Team lead changed");
    };
}
