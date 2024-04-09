import { IFile } from "@omniflow/common";
import { IDBUser } from "../repository/mongo/models/user.model.js";
import { IUser } from "./entity.interface.js";

export type IAuthUseCase = {
    signIn: (userData: IUser) => Promise<IUser>;
    login: (userData: {
        email: string;
        password: string;
    }) => Promise<{ user: IDBUser; token: string }>;
    verifyUser: (userData: { email: string; code: number }) => Promise<void>;
    resendCode: (data: { email: string }) => Promise<void>;
};

export type IUserUseCase = {
    changePassword: (data: {
        currentPassword: string;
        newPassword: string;
        username: string;
    }) => Promise<void>;
    currentUser: (data: { username: string }) => Promise<IDBUser>;
    getPublicUser: (data: { email: string }) => Promise<{
        email: string;
        username: string;
        avatar: string;
        name: string;
    }>;
    editProfile: (data: {
        email: string;
        name: string;
        imageInput: Express.Multer.File & IFile;
    }) => Promise<IDBUser>;
    getProfile: (data: { username: string }) => Promise<IDBUser>;
};
