import userModel from "./models/user.model.js";
import verificationCodeModel from "./models/verification-code.model.js";
import makeUserRepository from "./user-list.repository.js";
import makeVerificationCodeRepository from "./verification-code-list.repository.js";

export const userRepositoryMongo = makeUserRepository({ database: userModel });
export const verificationCodeRepositoryMongo = makeVerificationCodeRepository({
    database: verificationCodeModel,
});
