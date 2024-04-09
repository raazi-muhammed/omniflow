import { IUser } from "../../interfaces/entity.interface.js";
import { IDBUser } from "../mongo/models/user.model.js";
import { jest } from "@jest/globals";

const sampleUser: IUser & { id: string } = {
    id: "55153a8014829a865bbf700d",
    email: "example@gmail.com",
    username: "example_user",
    name: "Example User",
    avatar: "example_avatar.jpg",
    password: "hashedPassword",
    isVerified: true,
};

export const userRepositoryMock = {
    add: jest.fn<(userData: IUser) => Promise<IDBUser>>(() =>
        Promise.resolve(sampleUser as IDBUser)
    ),
    findByEmail: jest
        .fn<(email: string) => Promise<IDBUser | null>>()
        .mockImplementation((email: string) => {
            if (email === sampleUser.email) {
                return Promise.resolve(sampleUser);
            } else return Promise.resolve(null);
        }),
    findByUsername: jest
        .fn<(username: string) => Promise<IDBUser | null>>()
        .mockImplementation((username: string) => {
            if (username === sampleUser.username) {
                return Promise.resolve(sampleUser);
            } else return Promise.resolve(null);
        }),
    verifyUser: jest
        .fn<(email: string) => Promise<boolean>>()
        .mockImplementation((email: string) => {
            if (email === sampleUser.email) {
                sampleUser.isVerified = true;
                return Promise.resolve(true);
            } else return Promise.resolve(false);
        }),
    editUser: jest
        .fn<
            ({
                userId,
                name,
                avatar,
            }: {
                userId: string;
                name: string;
                avatar: string;
            }) => Promise<IDBUser>
        >()
        .mockImplementation(({ userId, name, avatar }) => {
            if (userId === sampleUser.id) {
                sampleUser.name = name;
                sampleUser.avatar = avatar;
                return Promise.resolve(sampleUser);
            } else return Promise.resolve(null);
        }),
    changePassword: jest
        .fn<
            ({
                userId,
                newPassword,
            }: {
                userId: string;
                newPassword: string;
            }) => Promise<boolean>
        >()
        .mockImplementation(({ userId, newPassword }) => {
            if (userId === sampleUser.id) {
                sampleUser.password = newPassword;
                return Promise.resolve(true);
            } else return Promise.resolve(false);
        }),
};
