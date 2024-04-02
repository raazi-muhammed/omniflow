import { IDBProject } from "../mongo/models/project.model.js";
import {
    IMemberInProject,
    IProject,
} from "../../interfaces/entity.interface.js";
import { jest } from "@jest/globals";

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
