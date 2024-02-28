import userModel from "./user.model.js";
import makeUserRepository from "./user-list.repository.js";

export const userRepository = makeUserRepository({ database: userModel });

export type UserListType = typeof userRepository;
