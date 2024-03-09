import { IDBUser } from "../repository/user.model.js";
import { IUser } from "./entity.interface.js";
import { IDBVerificationCode } from "../repository/verification-code.model.js";

export type IUserRepository = {
    add: (data: IUser) => Promise<IDBUser | null>;
    findByEmail: (email: string) => Promise<IDBUser | null>;
    findByUsername: (username: string) => Promise<IDBUser | null>;
    editUser: ({}: {
        userId: string;
        name: string;
        avatar: string;
    }) => Promise<IDBUser | null>;
    verifyUser: (email: string) => Promise<boolean | null>;
    changePassword: (data: {
        userId: string;
        newPassword: string;
    }) => Promise<boolean | null>;
};

export type IVerificationCodeRepository = {
    upsert: (data: {
        code: number;
        userId: string;
    }) => Promise<IDBVerificationCode | null>;
    find: (data: { userId: string }) => Promise<IDBVerificationCode | null>;
};
