import { ITeamController } from "../interfaces/controller.interface.js";
import buildInviteMemberController from "./invite-member.controller.js";
import { teamRepository, memberRepository } from "../repository/index.js";
import teamUseCases from "../use-cases/index.js";
import buildGetTeamsController from "./get-teams.controller.js";
import buildAddTeamController from "./add-team.controller.js";
import { createNameFromEmail } from "../lib/utils.js";

const addTeam = buildAddTeamController({
    addTeamUseCase: teamUseCases.addTeam,
    memberRepository,
    teamRepository,
});
const inviteMember = buildInviteMemberController({
    memberRepository,
    addMemberUseCase: teamUseCases.addMember,
    teamRepository,
    createNameFromEmail,
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
