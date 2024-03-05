import buildSignInController from "./sign-up.controller.js";
import authUseCase from "../use-cases/index.js";
import {
    verificationCodeRepository,
    userRepository,
} from "../repository/index.js";
import passwordHash from "../lib/password-hash.js";
import buildLoginController from "./login.controller.js";
import { token } from "@omniflow/common";
import buildCurrentUserController from "./current-user.controller.js";
import { IAuthController } from "../interfaces/controller.interface.js";
import buildVerifyUserController from "./verify-user.controller.js";
import { generateVerificationCode } from "../lib/code-generator.js";
import buildResendCodeUpController from "./resend-code.controller.js";
import buildLogOutUserController from "./logout-user.controller.js";
import buildGetProfileController from "./get-profile.controller.js";
import buildEditProfileController from "./edit-profile.controller.js";
import { uploadImageToS3 } from "../lib/file-bucket.js";
import { mailService } from "../lib/send-verification-mail.js";
import buildGetPublicUserController from "./get-public-user.controller.js";

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
});

export default authControllers;
