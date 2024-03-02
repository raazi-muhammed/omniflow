import { Types } from "mongoose";
import { IDBUser } from "../repository/user.model.js";
import { IUser } from "./entity.interface.js";
import { IDBVerificationCode } from "../repository/verification-code.model.js";

export type IUserRepository = {
    add: (data: IUser) => Promise<IDBUser>;
    findByEmail: (email: string) => Promise<IDBUser>;
    findByUsername: (username: string) => Promise<IDBUser>;
    verifyUser: (email: string) => Promise<boolean>;
};

export type IVerificationCodeRepository = {
    add: ({
        code,
        user,
    }: {
        code: number;
        user: Types.ObjectId;
    }) => Promise<IDBVerificationCode>;
    find: ({ user }: { user: Types.ObjectId }) => Promise<IDBVerificationCode>;
};
