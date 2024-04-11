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

export interface IUserEntity extends IUser {
    validate: () => void;
    get: () => IUser;
}

export interface IUserEntityConstructor {
    new (data: IUser): IUserEntity;
}
