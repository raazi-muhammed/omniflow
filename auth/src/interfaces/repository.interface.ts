import { Types } from "mongoose";
import { IDBUser } from "../repository/user.model.js";
import { IUser } from "./entity.interface.js";
import { IDBVerificationCode } from "../repository/verification-code.model.js";

export type IUserRepository = {
    add: (data: IUser) => Promise<IDBUser | null>;
    findByEmail: (email: string) => Promise<IDBUser | null>;
    findByUsername: (username: string) => Promise<IDBUser | null>;
    verifyUser: (email: string) => Promise<boolean | null>;
};

export type IVerificationCodeRepository = {
    upsert: ({
        code,
        user,
    }: {
        code: number;
        user: Types.ObjectId;
    }) => Promise<IDBVerificationCode | null>;
    find: ({
        user,
    }: {
        user: Types.ObjectId;
    }) => Promise<IDBVerificationCode | null>;
};
