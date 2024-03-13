import buildSignInController from "./auth/sign-up.controller.js";
import authUseCase from "../use-cases/index.js";
import {
    verificationCodeRepository,
    userRepository,
} from "../repository/index.js";
import passwordHash from "../lib/password-hash.js";
import buildLoginController from "./auth/login.controller.js";
import { token } from "@omniflow/common";
import buildCurrentUserController from "./user/current-user.controller.js";
import { IAuthController } from "../interfaces/controller.interface.js";
import buildVerifyUserController from "./auth/verify-user.controller.js";
import { generateVerificationCode } from "../lib/code-generator.js";
import buildResendCodeUpController from "./auth/resend-code.controller.js";
import buildLogOutUserController from "./auth/logout-user.controller.js";
import buildGetProfileController from "./user/get-user.controller.js";
import buildEditProfileController from "./user/edit-user.controller.js";
import { uploadImageToS3 } from "../lib/file-bucket.js";
import { mailService } from "../lib/send-verification-mail.js";
import buildGetPublicUserController from "./user/get-public-user.controller.js";
import buildChangePasswordController from "./user/change-password.controller.js";

const signIn = buildSignInController({
    signInUseCase: authUseCase.signIn,
    userRepository,
    mailService,
    generateCode: generateVerificationCode,
    verificationCodeRepository,
    passwordHash,
});

const verifyUser = buildVerifyUserController({
    userRepository,
    verificationCodeRepository,
});

const login = buildLoginController({
    userRepository,
    passwordHash,
    token,
});

const changePassword = buildChangePasswordController({
    userRepository,
    passwordHash,
});

const currentUser = buildCurrentUserController({ userRepository });
const logOut = buildLogOutUserController();

const resendCode = buildResendCodeUpController({
    userRepository,
    mailService,
    generateCode: generateVerificationCode,
    verificationCodeRepository,
});

const getProfile = buildGetProfileController({
    userRepository,
});

const editProfile = buildEditProfileController({
    imageUpload: uploadImageToS3,
    userRepository,
});

const getPublicUser = buildGetPublicUserController({ userRepository });
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
