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
    }) => Promise<IDBTeam>;
    getDefaultTeam: (data: { projectId: string }) => Promise<IDBTeam>;
    getTeams: (data: { projectId: string }) => Promise<IDBTeam[]>;
    add: (data: ITeam) => Promise<IDBTeam>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember>;
    upsert: (data: IMember) => Promise<IDBMember>;
    getByUsername: (username: string) => Promise<IDBMember>;
    getByEmail: (email: string) => Promise<IDBMember>;
};
