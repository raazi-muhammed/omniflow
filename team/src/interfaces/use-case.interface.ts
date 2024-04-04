import { IDBMemberAccess } from "../repository/mongo/models/member-access.model.js";
import { IDBMemberStatus } from "../repository/mongo/models/member-status.model.js";
import { IDBTeam } from "../repository/mongo/models/team.model.js";
import { IAccess } from "./entity.interface.js";
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
    getTeam: (data: {
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
        memberId: string;
        teamName: string;
        projectId: string;
    }) => Promise<void>;
    addMemberToTeam: (data: {
        memberId: string;
        teamName: string;
        projectId: string;
    }) => Promise<void>;
    getMembersList: (data: { projectId: string }) => Promise<IDBMemberStatus[]>;
    getMembersFromTeam: (data: {
        projectId: string;
        teamName: string;
    }) => Promise<IDBMemberStatus[]>;
    removeMemberFromProject: (data: {
        projectId: string;
        memberId: string;
    }) => Promise<void>;
    changeMemberAccess: (data: {
        userName: string;
        projectId: string;
        access: IAccess;
    }) => Promise<IDBMemberAccess>;
    getMemberAccess: (data: {
        userName: string;
        projectId: string;
    }) => Promise<IDBMemberAccess | null>;
};
