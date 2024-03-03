import { ITeamController } from "../interfaces/controller.interface.js";
import buildTeamController from "./add-team.controller.js";
import buildInviteMemberController from "./invite-member.controller.js";
import { teamRepository, memberRepository } from "../repository/index.js";
import teamUseCases from "../use-cases/index.js";
import buildGetTeamsController from "./get-teams.controller.js";

const addTeam = buildTeamController();
const inviteMember = buildInviteMemberController({
    memberRepository,
    addMemberUseCase: teamUseCases.addMember,
    teamRepository,
});

const getTeams = buildGetTeamsController({
    teamRepository,
});
const teamController: ITeamController = Object.freeze({
    addTeam,
    inviteMember,
    getTeams,
});

export default teamController;
