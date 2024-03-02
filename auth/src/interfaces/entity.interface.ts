import { Types } from "mongoose";

export interface IUser {
    name: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    avatar?: string;
}

export interface IVerificationCode {
    user: Types.ObjectId;
    code: number;
    expiresAt: Date;
}

class UserEntityClass {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;

    constructor(data: IUser) {}
    validate: () => void;
    get: () => IUser;
}

export type IUserEntity = typeof UserEntityClass;
