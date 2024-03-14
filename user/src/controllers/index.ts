import buildSignInController from "./auth/sign-up.controller.js";
import { authUseCases, userUseCases } from "../use-cases/index.js";
import buildLoginController from "./auth/login.controller.js";
import buildCurrentUserController from "./user/current-user.controller.js";
import { IAuthController } from "../interfaces/controller.interface.js";
import buildVerifyUserController from "./auth/verify-user.controller.js";
import buildResendCodeUpController from "./auth/resend-code.controller.js";
import buildLogOutUserController from "./auth/logout-user.controller.js";
import buildGetProfileController from "./user/get-user.controller.js";
import buildEditProfileController from "./user/edit-user.controller.js";
import buildGetPublicUserController from "./user/get-public-user.controller.js";
import buildChangePasswordController from "./user/change-password.controller.js";

const signIn = buildSignInController({
    authUseCases,
});

const verifyUser = buildVerifyUserController({
    authUseCases,
});

const login = buildLoginController({
    authUseCases,
});

const changePassword = buildChangePasswordController({
    userUseCases,
});

const currentUser = buildCurrentUserController({ userUseCases });
const logOut = buildLogOutUserController();

const resendCode = buildResendCodeUpController({
    authUseCases,
});

const getProfile = buildGetProfileController({
    userUseCases,
});

const editProfile = buildEditProfileController({
    userUseCases,
});

const getPublicUser = buildGetPublicUserController({ userUseCases });
const authControllers: IAuthController = Object.freeze({
    signIn,
    login,
    currentUser,
    verifyUser,
    resendCode,
    logOut,
    getProfile,
    editProfile,
    getPublicUser,
    changePassword,
});

export default authControllers;
