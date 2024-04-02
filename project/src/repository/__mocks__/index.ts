import { IMemberRepository } from "../../interfaces/repository.interface.js";
import { jest } from "@jest/globals";
import { IDBProject } from "../mongo/models/project.model.js";
import {
    IMember,
    IMemberInProject,
    IProject,
} from "../../interfaces/entity.interface.js";
import { IDBMember } from "../mongo/models/members.model.js";

export const memberRepositoryMock: IMemberRepository = {
    add: jest.fn<(data: IMember) => Promise<IDBMember | null>>(),
    upsert: jest.fn<(data: IMember) => Promise<IDBMember | null>>(),
    getByUsername: jest.fn<(username: string) => Promise<IDBMember | null>>(),
    getByEmail: jest.fn<(email: string) => Promise<IDBMember | null>>(),
    editUser:
        jest.fn<
            (data: {
                avatar?: string;
                username: string;
                name: string;
            }) => Promise<boolean>
        >(),
};

export const projectRepositoryMock = {
    add: jest.fn<(data: IProject) => Promise<IDBProject | null>>(),
    edit: jest.fn<
        (data: {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            dueDate: Date;
            priority: number;
        }) => Promise<boolean | null>
    >(),
    getAll: jest.fn<(userId: string) => Promise<IDBProject[] | null>>(),
    get: jest.fn<(id: string) => Promise<IDBProject | null>>(),
    delete: jest.fn<(id: string) => Promise<boolean | null>>(),
    addMember:
        jest.fn<
            (data: {
                projectId: string;
                member: IMemberInProject;
            }) => Promise<boolean | null>
        >(),
    removeMember:
        jest.fn<
            (data: {
                projectId: string;
                memberId: string;
            }) => Promise<boolean | null>
        >(),
    changeTeamLead:
        jest.fn<
            (data: {
                projectId: string;
                userId: string;
            }) => Promise<boolean | null>
        >(),
};
