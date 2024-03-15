import Team from "../entities/team.entity.js";
import Member from "../entities/member.entity.js";
import buildAddTeamUseCase from "./team/add-team.use-case.js";
import {
    IMemberUseCases,
    ITeamUseCases,
} from "../interfaces/use-case.interface.js";
import { teamRepository, memberRepository } from "../repository/index.js";
import buildInviteMemberUseCase from "./member/invite-member.use-case.js";
import { mailService } from "../lib/send-invitation-mail.js";
import { token } from "@omniflow/common";
import buildChangeTeamLeadUseCase from "./team/change-team-lead.use-case.js";
import buildGetMembersFromTeamUseCase from "./team/get-team-members.use-case.js";
import buildGetTeamsUseCase from "./team/get-teams.use-case.js";
import buildRemoveTeamUseCase from "./team/remove-team.use-case.js";
import buildChangeInvitationStatusUseCase from "./member/change-invitation-status.use-case.js";
import buildGetMembersListUseCase from "./member/get-members.use-case.js";
import buildMoveMemberToTeamUseCase from "./member/move-team-member.use-case.js";
import buildRemoveMemberFromTeamUseCase from "./member/remove-team-member.use-case.js";
import { memberProducers } from "../events/producers/index.js";

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
});
const changeTeamLead = buildChangeTeamLeadUseCase({
    teamRepository,
    memberRepository,
});
const getTeamMembers = buildGetMembersFromTeamUseCase({
    teamRepository,
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
});

const getMembersList = buildGetMembersListUseCase({
    teamRepository,
});

const moveMemberToTeam = buildMoveMemberToTeamUseCase({
    teamRepository,
    memberRepository,
});

const removeMemberFromTeam = buildRemoveMemberFromTeamUseCase({
    teamRepository,
    memberRepository,
    memberProducers,
});

export const teamUseCases: ITeamUseCases = Object.freeze({
    addTeam,
    changeTeamLead,
    getTeamMembers,
    getTeams,
    removeTeam,
});

export const memberUseCases: IMemberUseCases = Object.freeze({
    inviteMember,
    changeInvitationStatus,
    getMembersList,
    moveMemberToTeam,
    removeMemberFromTeam,
});
