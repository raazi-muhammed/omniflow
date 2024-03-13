import {
    AnErrorOccurredError,
    BadRequestError,
    ConflictError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { IAddTeamUseCase } from "../../interfaces/use-case.interface.js";
import { InviteStatus, Role } from "../../interfaces/entity.interface.js";

export default function buildAddTeamController({
    teamRepository,
    memberRepository,
    addTeamUseCase,
}: {
    addTeamUseCase: IAddTeamUseCase;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const teamInput = req.body;
        validateBody(teamInput, ["name", "lead"]);

        const user = await memberRepository.getByEmail(teamInput.lead);

        const foundTeam = await teamRepository.getTeam({
            projectId: currentProject.id,
            teamName: teamInput.name,
        });
        if (foundTeam) throw new ConflictError("Team name taken");

        const team = addTeamUseCase({
            name: teamInput.name,
            project: currentProject.id,
            lead: user.id,
            members: [
                {
                    role: Role.TEAM_LEAD,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: user.id,
                },
            ],
        });

        await teamRepository.removeMemberFromTeam({
            teamName: "Default",
            projectId: currentProject.id,
            memberId: String(user._id),
        });

        const teamAdded = await teamRepository.add(team);
        if (!teamAdded) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setData(teamAdded).setMessage("Team added");
    };
}
