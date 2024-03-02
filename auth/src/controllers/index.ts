import buildSignInController from "./sign-up.controller.js";
import authUseCase from "../use-cases/index.js";
import { userRepository } from "../repository/index.js";
import passwordHash from "../lib/password-hash.js";
import buildLoginController from "./login.controller.js";
import { token } from "@omniflow/common";
import buildCurrentUserController from "./current-user.controller.js";
import { IAuthController } from "../interfaces/controller.interface.js";

const signIn = buildSignInController({
    signInUseCase: authUseCase.signIn,
    userRepository,
    passwordHash,
});

const login = buildLoginController({
    userRepository,
    passwordHash,
    token,
});

const currentUser = buildCurrentUserController({ token, userRepository });

const authControllers: IAuthController = Object.freeze({
    signIn,
    login,
    currentUser,
});

export default authControllers;
