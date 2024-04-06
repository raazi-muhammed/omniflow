import { IMember } from "../../interfaces/entity.interface.js";
import { IDBMember } from "../mongo/models/members.model.js";
import { jest } from "@jest/globals";

const sampleMember: IMember & { id: string } = {
    id: "55153a8014829a865bbf700d",
    email: "raazi@gmail.com",
    name: "raazi",
    username: "raazi",
};

export const memberRepositoryMock = {
    add: jest.fn<(data: IMember) => Promise<IDBMember | null>>(() =>
        Promise.resolve(sampleMember as IDBMember)
    ),
    upsert: jest.fn<(data: IMember) => Promise<IDBMember | null>>(),
    getByUsername: jest
        .fn<(username: string) => Promise<IDBMember | null>>()
        .mockImplementation((username: string) => {
            if (username === sampleMember.username) {
                return Promise.resolve(sampleMember);
            } else return Promise.resolve(null);
        }),
    getByEmail: jest
        .fn<(email: string) => Promise<IDBMember | null>>()
        .mockImplementation((email: string) => {
            if (email === sampleMember.email) {
                return Promise.resolve(sampleMember);
            } else return Promise.resolve(null);
        }),
    editUser:
        jest.fn<
            (data: {
                avatar?: string;
                username: string;
                name: string;
            }) => Promise<boolean>
        >(),
};
