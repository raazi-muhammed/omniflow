import { IMember } from "../../interfaces/entity.interface.js";
import { IDBMember } from "../mongo/models/members.model.js";
import { jest } from "@jest/globals";

export const memberRepositoryMock = {
    add: jest.fn<(data: IMember) => Promise<IDBMember | null>>(() =>
        Promise.resolve({
            id: "asdfas",
            email: "asdfasld",
            name: "hoo",
            username: "asdf",
            createdAt: new Date(),
            updatedAt: new Date(),
        } as IDBMember)
    ),
    upsert: jest.fn<(data: IMember) => Promise<IDBMember | null>>(),
    getByUsername: jest.fn<(username: string) => Promise<IDBMember | null>>(),
    getByEmail: jest
        .fn<(email: string) => Promise<IDBMember | null>>()
        .mockImplementation(() =>
            Promise.resolve({
                id: "asdfas",
                email: "asdfasld",
                name: "hoo",
                username: "asdf",
                createdAt: new Date(),
                updatedAt: new Date(),
            } as IDBMember)
        ),
    editUser:
        jest.fn<
            (data: {
                avatar?: string;
                username: string;
                name: string;
            }) => Promise<boolean>
        >(),
};
