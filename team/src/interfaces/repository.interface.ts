import { IDBMember } from "../repository/members.model.js";
import { IMember, IMemberInProject, ITeam } from "./entity.interface.js";
import { IDBTeam } from "../repository/team.model.js";

export type ITeamRepository = {
    addMember: (data: {
        teamId: string;
        member: IMemberInProject;
    }) => Promise<IDBTeam | null>;
    addMemberToTeam: (data: {
        member: IMemberInProject;
        teamName: string;
        projectId: string;
    }) => Promise<boolean | null>;
    getDefaultTeam: (data: { projectId: string }) => Promise<IDBTeam | null>;
    getTeams: (data: { projectId: string }) => Promise<IDBTeam[] | null>;
    getTeam: (data: {
        projectId: string;
        teamName: string;
    }) => Promise<IDBTeam | null>;
    removeTeam: (data: {
        projectId: string;
        teamName: string;
    }) => Promise<boolean | null>;
    changeTeamLead: (data: {
        projectId: string;
        teamName: string;
        userId: string;
    }) => Promise<boolean | null>;
    add: (data: ITeam) => Promise<IDBTeam | null>;
    getAllMembers: (data: {
        projectId: string;
    }) => Promise<IAllMemberList[] | null>;
    invitationAccepted: (data: {
        projectId: string;
        memberId: string;
    }) => Promise<boolean | null>;
    invitationRejected: (data: {
        projectId: string;
        memberId: string;
    }) => Promise<boolean | null>;
    removeMemberFromTeam: (data: {
        projectId: string;
        teamName: string;
        memberId: string;
    }) => Promise<boolean | null>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember | null>;
    upsert: (data: IMember) => Promise<IDBMember | null>;
    getByUsername: (username: string) => Promise<IDBMember | null>;
    getByEmail: (email: string) => Promise<IDBMember | null>;
    getById: (id: string) => Promise<IDBMember | null>;
};

export type IAllMemberList = {
    project: string;
    team: string;
    info: IMember;
};
