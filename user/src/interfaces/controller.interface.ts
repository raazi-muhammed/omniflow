import { IRequest, ResponseCreator } from "@omniflow/common";

export type IAuthController = {
    signIn: (req: IRequest) => Promise<ResponseCreator>;
    login: (req: IRequest) => Promise<ResponseCreator>;
    logOut: (req: IRequest) => Promise<ResponseCreator>;
    currentUser: (req: IRequest) => Promise<ResponseCreator>;
    editProfile: (req: IRequest) => Promise<ResponseCreator>;
    verifyUser: (req: IRequest) => Promise<ResponseCreator>;
    resendCode: (req: IRequest) => Promise<ResponseCreator>;
    getProfile: (req: IRequest) => Promise<ResponseCreator>;
    getPublicUser: (req: IRequest) => Promise<ResponseCreator>;
};
