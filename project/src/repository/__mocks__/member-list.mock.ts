import { IMember } from "../../interfaces/entity.interface.js";
import { IMemberRepository } from "../../interfaces/repository.interface.js";
import { IDBMember } from "../mongo/models/members.model.js";
import { jest } from "@jest/globals";

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
