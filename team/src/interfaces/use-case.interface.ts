import { IDBTeam } from "../repository/team.model.js";
import { IAllMemberList } from "./repository.interface.js";

export type ITeamUseCases = {
    addTeam: (data: {
        teamName: string;
        leadEmail: string;
        projectId: string;
    }) => Promise<IDBTeam>;
    changeTeamLead: (data: {
        leadEmail: string;
        teamName: string;
        projectId: string;
    }) => Promise<void>;
    getTeamMembers: (data: {
        teamName: string;
        projectId: string;
    }) => Promise<IDBTeam>;
    getTeams: (data: { projectId: string }) => Promise<IDBTeam[]>;
    removeTeam: (data: {
        projectId: string;
        teamName: string;
    }) => Promise<void>;
};

export type IMemberUseCases = {
    inviteMember: (data: {
        email: string;
        message: string;
        username: string;
        avatar?: string;
        projectId: string;
        name: string;
    }) => Promise<void>;
    changeInvitationStatus: (data: {
        memberId: string;
        projectId: string;
        currentUserEmail: string;
        invitationAccepted: boolean;
    }) => Promise<void>;
    moveMemberToTeam: (data: {
        toTeamName: string;
        formTeamName: string;
        projectId: string;
        memberEmail: string;
    }) => Promise<void>;
    removeMemberFromTeam: (data: {
        memberEmail: string;
        teamName: string;
        projectId: string;
    }) => Promise<void>;
    getMembersList: (data: { projectId: string }) => Promise<IAllMemberList[]>;
};
