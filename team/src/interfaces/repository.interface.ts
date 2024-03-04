import { IDBMember } from "../repository/members.model.js";
import {
    IDType,
    IMember,
    IMemberInProject,
    ITeam,
} from "./entity.interface.js";
import { IDBTeam } from "../repository/team.model.js";

export type ITeamRepository = {
    addMember: (data: {
        teamId: IDType;
        member: IMemberInProject;
    }) => Promise<IDBTeam | null>;
    getDefaultTeam: (data: { projectId: string }) => Promise<IDBTeam | null>;
    getTeams: (data: { projectId: string }) => Promise<IDBTeam[] | null>;
    add: (data: ITeam) => Promise<IDBTeam | null>;
    invitationAccepted: (data: {
        projectId: string;
        memberId: string;
    }) => Promise<boolean | null>;
    invitationRejected: (data: {
        projectId: string;
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
