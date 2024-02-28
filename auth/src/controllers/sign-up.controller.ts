import { Request } from "express";
import { IUser } from "../interfaces/entity.interface.js";
import { ISignInUseCase } from "../interfaces/use-case.interface.js";
import validateBody from "../lib/body-validator.js";
import IUserRepository from "../interfaces/repository.interface.js";
import IPasswordHash from "../interfaces/password-hash.interface.js";

export default function makeSignInController(
    signInUseCase: ISignInUseCase,
    userRepository: IUserRepository,
    passwordHash: IPasswordHash
) {
    return async (req: Request) => {
        const userData: IUser = req.body;
        validateBody(userData, ["username", "email", "password", "name"]);

        const user = await signInUseCase(userData);

        const userWithSameMail = await userRepository.findByEmail(user.email);
        if (userWithSameMail) throw new Error("email taken");

        const userWithSameUsername = await userRepository.findByUsername(
            user.username
        );
        if (userWithSameUsername) throw new Error("username taken");

        const hashedPassword = await passwordHash.hash(user.password);
        if (!hashedPassword) throw new Error("An error occurred in password");

        const isUserCreated = await userRepository.add({
            ...user,
            password: hashedPassword,
        });
        if (!isUserCreated) throw new Error("Cannot create user");

        return user;
    };
}
