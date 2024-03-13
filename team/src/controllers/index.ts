import { ITeamController } from "../interfaces/controller.interface.js";
import buildInviteMemberController from "./member/invite-member.controller.js";
import { teamRepository, memberRepository } from "../repository/index.js";
import teamUseCases from "../use-cases/index.js";
import buildGetTeamsController from "./team/get-teams.controller.js";
import buildAddTeamController from "./team/add-team.controller.js";
import { createNameFromEmail } from "../lib/utils.js";
import { token } from "@omniflow/common";
import buildChangeInvitationStatusController from "./member/change-invitation-status.controller.js";
import { mailService } from "../lib/send-invitation-mail.js";
import buildGetMembersListController from "./member/get-members.controller.js";
import producer from "../events/producer.js";
import buildGetMembersFromTeamController from "./team/get-team-members.controller.js";
import buildChangeTeamLeadController from "./team/change-team-lead.controller.js";
import buildMoveMemberToTeamController from "./member/move-team-member.controller.js";
import buildRemoveMemberFromTeamController from "./member/remove-team-member.controller.js";
import buildRemoveTeamController from "./team/remove-team.controller.js";

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
const getMembers = buildGetMembersListController({
    teamRepository,
});

const changeMemberInvitationStatus = buildChangeInvitationStatusController({
    token,
    productAddMember: producer.productAddMember,
    teamRepository,
    memberRepository,
});

const changeTeamLead = buildChangeTeamLeadController({
    teamRepository,
    memberRepository,
});

const getTeamMembers = buildGetMembersFromTeamController({ teamRepository });

const moveTeamMember = buildMoveMemberToTeamController({
    teamRepository,
    memberRepository,
});

const removeTeamMember = buildRemoveMemberFromTeamController({
    teamRepository,
    memberRepository,
});

const removeTeam = buildRemoveTeamController({ teamRepository });
const teamController: ITeamController = Object.freeze({
    addTeam,
    inviteMember,
    getTeams,
    changeMemberInvitationStatus,
    getMembers,
    getTeamMembers,
    changeTeamLead,
    moveTeamMember,
    removeTeamMember,
    removeTeam,
});

export default teamController;
