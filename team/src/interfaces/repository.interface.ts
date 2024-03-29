import { IDBMember } from "../repository/mongo/models/member.model.js";
import { IMember, IMemberStatus, ITeam } from "./entity.interface.js";
import { IDBTeam } from "../repository/mongo/models/team.model.js";
import { IDBMemberStatus } from "../repository/mongo/models/member-status.model.js";

export type ITeamRepository = {
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
};

export type IMemberStatusRepository = {
    addMember: (data: IMemberStatus) => Promise<IDBMemberStatus>;
    getAllMembers: (data: { projectId: string }) => Promise<IDBMemberStatus[]>;
    removeMemberFromTeam: (data: {
        projectId: string;
        teamName: string;
        memberId: string;
    }) => Promise<boolean>;
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
