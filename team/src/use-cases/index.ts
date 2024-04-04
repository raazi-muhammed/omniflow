import Team from "../entities/team.entity.js";
import Member from "../entities/member.entity.js";
import buildAddTeamUseCase from "./team/add-team.use-case.js";
import {
    IMemberUseCases,
    ITeamUseCases,
} from "../interfaces/use-case.interface.js";
import {
    teamRepository,
    memberRepository,
    memberStatusRepository,
    memberAccessRepository,
} from "../repository/mongo/index.js";
import buildInviteMemberUseCase from "./member/invite-member.use-case.js";
import { mailService } from "../lib/send-invitation-mail.js";
import { token } from "@omniflow/common";
import buildChangeTeamLeadUseCase from "./team/change-team-lead.use-case.js";
import buildGetTeamsUseCase from "./team/get-teams.use-case.js";
import buildRemoveTeamUseCase from "./team/remove-team.use-case.js";
import buildChangeInvitationStatusUseCase from "./member/change-invitation-status.use-case.js";
import buildGetMembersListUseCase from "./member/get-members.use-case.js";
import buildMoveMemberToTeamUseCase from "./member/move-team-member.use-case.js";
import buildRemoveMemberFromTeamUseCase from "./member/remove-member-from-team.use-case.js";
import { memberProducers } from "../events/producers/index.js";
import buildAddMemberToTeamUseCase from "./member/add-member-to-team.use-case.js";
import buildGetTeamUseCase from "./team/get-team.use-case.js";
import buildGetMembersFromTeamUseCase from "./member/get-members-from-team.use-case.js";
import buildRemoveMemberFromProjectUseCase from "./member/remove-member-from-project.js";
import buildChangeMemberAccessUseCase from "./member/change-member-access.use-case.js";
import buildGetMemberAccessUseCase from "./member/get-member-access.use-case.js";
import buildAddProjectLeadUseCase from "./member/add-project-lead.use-case.js";

const addTeam = buildAddTeamUseCase({
    TeamEntity: Team,
    teamRepository,
    memberRepository,
});
const inviteMember = buildInviteMemberUseCase({
    MemberCreator: Member,
    token,
    teamRepository,
    mailService,
    memberRepository,
    memberStatusRepository,
});
const changeTeamLead = buildChangeTeamLeadUseCase({
    teamRepository,
    memberRepository,
});
const getTeam = buildGetTeamUseCase({
    teamRepository,
    memberStatusRepository,
});
const getTeams = buildGetTeamsUseCase({
    teamRepository,
});
const removeTeam = buildRemoveTeamUseCase({
    teamRepository,
});
const changeInvitationStatus = buildChangeInvitationStatusUseCase({
    memberRepository,
    teamRepository,
    memberProducers,
    memberStatusRepository,
});

const getMembersList = buildGetMembersListUseCase({
    memberStatusRepository,
});
const getMembersFromTeam = buildGetMembersFromTeamUseCase({
    teamRepository,
    memberStatusRepository,
});

const moveMemberToTeam = buildMoveMemberToTeamUseCase({
    memberStatusRepository,
    memberRepository,
    teamRepository,
});

const removeMemberFromTeam = buildRemoveMemberFromTeamUseCase({
    memberStatusRepository,
});

const addMemberToTeam = buildAddMemberToTeamUseCase({
    teamRepository,
    memberStatusRepository,
});

const removeMemberFromProject = buildRemoveMemberFromProjectUseCase({
    memberStatusRepository,
});

const changeMemberAccess = buildChangeMemberAccessUseCase({
    memberAccessRepository,
    memberRepository,
});
const getMemberAccess = buildGetMemberAccessUseCase({
    memberAccessRepository,
    memberRepository,
});
const addProjectLead = buildAddProjectLeadUseCase({
    MemberCreator: Member,
    memberRepository,
    memberStatusRepository,
});

export const teamUseCases: ITeamUseCases = Object.freeze({
    addTeam,
    changeTeamLead,
    getTeam,
    getTeams,
    removeTeam,
});

export const memberUseCases: IMemberUseCases = Object.freeze({
    inviteMember,
    changeInvitationStatus,
    getMembersList,
    addMemberToTeam,
    moveMemberToTeam,
    removeMemberFromTeam,
    getMembersFromTeam,
    removeMemberFromProject,
    changeMemberAccess,
    getMemberAccess,
    addProjectLead,
});
