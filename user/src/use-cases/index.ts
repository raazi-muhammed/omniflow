import buildSignIn from "./auth/sign-in.use-case.js";
import authEntities from "../entities/index.js";
import {
    userRepository,
    verificationCodeRepository,
} from "../repository/index.js";
import buildLoginUseCase from "./auth/login.use-case.js";
import passwordHash from "../lib/password-hash.js";
import { token } from "@omniflow/common";
import {
    IAuthUseCase,
    IUserUseCase,
} from "../interfaces/use-case.interface.js";
import buildVerifyUserUseCase from "./auth/verify-use.use-case.js";
import buildResendCodeUseCase from "./auth/resend-code.use-case.js";
import { mailService } from "../lib/send-verification-mail.js";
import { generateVerificationCode } from "../lib/code-generator.js";
import buildChangePasswordUseCase from "./user/change-passsowrd.use-case.js";
import buildCurrentUserUseCase from "./user/current-user.use-case.js";
import buildEditProfileUseCase from "./user/edit-user.use-case.js";
import { uploadImageToS3 } from "../lib/file-bucket.js";
import buildGetPublicUserUseCase from "./user/get-public-user.use-case.js";
import buildGetProfileUseCase from "./user/get-user.use-case.js";
import { userProducers } from "../events/products/index.js";

const signIn = buildSignIn({
    userRepository,
    verificationCodeRepository,
    passwordHash,
    generateCode: generateVerificationCode,
    mailService,
    UserEntity: authEntities.User,
});
const login = buildLoginUseCase({ userRepository, passwordHash, token });
const verifyUser = buildVerifyUserUseCase({
    userRepository,
    verificationCodeRepository,
});
const resendCode = buildResendCodeUseCase({
    verificationCodeRepository,
    mailService,
    generateCode: generateVerificationCode,
    userRepository,
});

const changePassword = buildChangePasswordUseCase({
    userRepository,
    passwordHash,
});

const currentUser = buildCurrentUserUseCase({
    userRepository,
});
const getPublicUser = buildGetPublicUserUseCase({
    userRepository,
});
const editProfile = buildEditProfileUseCase({
    userRepository,
    imageUpload: uploadImageToS3,
    userProducers,
});
const getProfile = buildGetProfileUseCase({
    userRepository,
});

export const authUseCases: IAuthUseCase = Object.freeze({
    signIn,
    login,
    verifyUser,
    resendCode,
});
export const userUseCases: IUserUseCase = Object.freeze({
    changePassword,
    currentUser,
    editProfile,
    getPublicUser,
    getProfile,
});
