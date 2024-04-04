import { ITeamController } from "../interfaces/controller.interface.js";
import buildInviteMemberController from "./member/invite-member.controller.js";
import { teamUseCases, memberUseCases } from "../use-cases/index.js";
import buildGetTeamsController from "./team/get-teams.controller.js";
import buildAddTeamController from "./team/add-team.controller.js";
import { token } from "@omniflow/common";
import buildChangeInvitationStatusController from "./member/change-invitation-status.controller.js";
import buildChangeTeamLeadController from "./team/change-team-lead.controller.js";
import buildMoveMemberToTeamController from "./member/move-team-member.controller.js";
import buildRemoveMemberFromTeamController from "./member/remove-member-from-team.controller.js";
import buildRemoveTeamController from "./team/remove-team.controller.js";
import buildGetTeamController from "./team/get-team.controller.js";
import buildGetMembersController from "./member/get-members.controller.js";
import buildGetMembersFromTeamController from "./member/get-members-from-team.controller.js";
import buildRemoveMemberFromProjectController from "./member/remove-member-from-project.js";
import buildAddMemberToTeamController from "./member/add-member-to-team.controller.js";
import buildChangeMemberAccessController from "./member/change-member-access.controller.js";
import buildGetMemberAccessController from "./member/get-member-access.controller.js";

const addTeam = buildAddTeamController({
    teamUseCases,
});
const inviteMember = buildInviteMemberController({
    memberUseCases,
});

const getTeams = buildGetTeamsController({
    teamUseCases,
});
const getMembers = buildGetMembersController({
    memberUseCases,
});

const changeMemberInvitationStatus = buildChangeInvitationStatusController({
    memberUseCases,
    token,
});

const changeTeamLead = buildChangeTeamLeadController({
    teamUseCases,
});

const getTeam = buildGetTeamController({ teamUseCases });

const moveTeamMember = buildMoveMemberToTeamController({
    memberUseCases,
});

const removeMemberFromTeam = buildRemoveMemberFromTeamController({
    memberUseCases,
});

const removeTeam = buildRemoveTeamController({ teamUseCases });

const addMemberToTeam = buildAddMemberToTeamController({ memberUseCases });
const getMembersFromTeam = buildGetMembersFromTeamController({
    memberUseCases,
});

const removeMemberFromProject = buildRemoveMemberFromProjectController({
    memberUseCases,
});
const changeMemberAccess = buildChangeMemberAccessController({
    memberUseCases,
});
const getMemberAccess = buildGetMemberAccessController({
    memberUseCases,
});

const teamController: ITeamController = Object.freeze({
    addTeam,
    inviteMember,
    getTeams,
    changeMemberInvitationStatus,
    getMembers,
    getTeam,
    changeTeamLead,
    moveTeamMember,
    removeMemberFromTeam,
    removeTeam,
    addMemberToTeam,
    getMembersFromTeam,
    removeMemberFromProject,
    changeMemberAccess,
    getMemberAccess,
});

export default teamController;
