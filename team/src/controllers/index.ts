import { ITeamController } from "../interfaces/controller.interface.js";
import buildInviteMemberController from "./invite-member.controller.js";
import { teamRepository, memberRepository } from "../repository/index.js";
import teamUseCases from "../use-cases/index.js";
import buildGetTeamsController from "./get-teams.controller.js";
import buildAddTeamController from "./add-team.controller.js";
import { createNameFromEmail } from "../lib/utils.js";
import { token } from "@omniflow/common";
import buildChangeInvitationStatusController from "./change-invitation-status.controller.js";
import { mailService } from "../lib/send-invitation-mail.js";

const addTeam = buildAddTeamController({
    addTeamUseCase: teamUseCases.addTeam,
    memberRepository,
    teamRepository,
});
const inviteMember = buildInviteMemberController({
    memberRepository,
    token,
    addMemberUseCase: teamUseCases.addMember,
    teamRepository,
    mailService,
    createNameFromEmail,
});

const getTeams = buildGetTeamsController({
    teamRepository,
});

const changeInvitationStatus = buildChangeInvitationStatusController({
    token,
    teamRepository,
    memberRepository,
});

const teamController: ITeamController = Object.freeze({
    addTeam,
    inviteMember,
    getTeams,
    changeInvitationStatus,
});

export default teamController;
