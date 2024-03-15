import { ITeamController } from "../interfaces/controller.interface.js";
import buildInviteMemberController from "./member/invite-member.controller.js";
import { teamUseCases, memberUseCases } from "../use-cases/index.js";
import buildGetTeamsController from "./team/get-teams.controller.js";
import buildAddTeamController from "./team/add-team.controller.js";
import { token } from "@omniflow/common";
import buildChangeInvitationStatusController from "./member/change-invitation-status.controller.js";
import buildGetMembersListController from "./member/get-members.controller.js";
import buildGetMembersFromTeamController from "./team/get-team-members.controller.js";
import buildChangeTeamLeadController from "./team/change-team-lead.controller.js";
import buildMoveMemberToTeamController from "./member/move-team-member.controller.js";
import buildRemoveMemberFromTeamController from "./member/remove-team-member.controller.js";
import buildRemoveTeamController from "./team/remove-team.controller.js";
import buildAddMemberToTeamController from "./member/add-member-to-team.controller.js";

const addTeam = buildAddTeamController({
    teamUseCases,
});
const inviteMember = buildInviteMemberController({
    memberUseCases,
});

const getTeams = buildGetTeamsController({
    teamUseCases,
});
const getMembers = buildGetMembersListController({
    memberUseCases,
});

const changeMemberInvitationStatus = buildChangeInvitationStatusController({
    memberUseCases,
    token,
});

const changeTeamLead = buildChangeTeamLeadController({
    teamUseCases,
});

const getTeamMembers = buildGetMembersFromTeamController({ teamUseCases });

const moveTeamMember = buildMoveMemberToTeamController({
    memberUseCases,
});

const removeTeamMember = buildRemoveMemberFromTeamController({
    memberUseCases,
});

const removeTeam = buildRemoveTeamController({ teamUseCases });

const addMemberToTeam = buildAddMemberToTeamController({ memberUseCases });

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
    addMemberToTeam,
});

export default teamController;
