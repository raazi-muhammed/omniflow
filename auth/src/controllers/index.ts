import makeSignInController from "./sign-up.controller.js";

import authUseCase from "../use-cases/index.js";
import { userRepository } from "../repository/index.js";
import passwordHash from "../lib/password-hash.js";

const signIn = makeSignInController(
    authUseCase.signIn,
    userRepository,
    passwordHash
);

export default Object.freeze({
    signIn,
});
