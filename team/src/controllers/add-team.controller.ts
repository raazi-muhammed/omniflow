import {
    AnErrorOccurredError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { IAddTeamUseCase } from "../interfaces/use-case.interface.js";
import { InviteStatus, Role } from "../interfaces/entity.interface.js";

export default function buildAddTeamController({
    teamRepository,
    addTeamUseCase,
    memberRepository,
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

        const team = addTeamUseCase({
            name: teamInput.name,
            project: currentProject._id,
            lead: user._id,
            members: [
                {
                    role: Role.TEAM_LEAD,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: user._id,
                },
            ],
        });

        await teamRepository.removeMemberFromTeam({
            teamName: "Default",
            projectId: currentProject._id,
            memberEmail: String(user._id),
        });

        const teamAdded = await teamRepository.add(team);
        if (!teamAdded) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setData(teamAdded).setMessage("Team added");
    };
}
