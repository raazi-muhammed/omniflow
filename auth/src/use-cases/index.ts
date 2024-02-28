import buildSignIn from "./sign-in.use-case.js";
import authEntities from "../entities/index.js";

const signIn = buildSignIn(authEntities.User);

export default Object.freeze({
    signIn,
});
