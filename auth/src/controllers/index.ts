import makeSignInController from "./sign-up.controller.js";

import authUseCase from "../use-cases/index.js";

const signIn = makeSignInController(authUseCase.signIn);

export default Object.freeze({
    signIn,
});
