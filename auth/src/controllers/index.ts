import buildSignInController from "./sign-up.controller.js";
import authUseCase from "../use-cases/index.js";
import { userRepository } from "../repository/index.js";
import passwordHash from "../lib/password-hash.js";
import buildLoginController from "./login.controller.js";
import token from "../lib/token.js";
import buildCurrentUserController from "./current-user.controller.js";

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

export default Object.freeze({
    signIn,
    login,
    currentUser,
});
