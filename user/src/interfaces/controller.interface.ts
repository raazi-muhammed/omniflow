import { IRequest, ReposeCreator } from "@omniflow/common";

export type IAuthController = {
    signIn: (req: IRequest) => Promise<ReposeCreator>;
    login: (req: IRequest) => Promise<ReposeCreator>;
    logOut: (req: IRequest) => Promise<ReposeCreator>;
    currentUser: (req: IRequest) => Promise<ReposeCreator>;
    editProfile: (req: IRequest) => Promise<ReposeCreator>;
    verifyUser: (req: IRequest) => Promise<ReposeCreator>;
    resendCode: (req: IRequest) => Promise<ReposeCreator>;
    getProfile: (req: IRequest) => Promise<ReposeCreator>;
};
