import userModel from "./user.model.js";
import verificationCodeModel from "./verification-code.model.js";
import makeUserRepository from "./user-list.repository.js";
import makeVerificationCodeRepository from "./verification-code-list.repository.js";

export const userRepository = makeUserRepository({ database: userModel });
export const verificationCodeRepository = makeVerificationCodeRepository({
    database: verificationCodeModel,
});

// export type UserListType = typeof userRepository;
// export type UserListType = typeof userRepository;
