import { IToken, UnauthorizedError, UserNotFoundError } from "@omniflow/common";
import { IUser } from "../../interfaces/entity.interface.js";
import IPasswordHash from "../../interfaces/password-hash.interface.js";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildLoginUseCase({
    userRepository,
    passwordHash,
    token,
}: {
    userRepository: IUserRepository;
    passwordHash: IPasswordHash;
    token: IToken<IUser>;
}) {
    return async (inputData: { email: string; password: string }) => {
        const userFound = await userRepository.findByEmail(inputData.email);
        if (!userFound) throw new UserNotFoundError();

        const doesPasswordMatch = await passwordHash.compare(
            inputData.password,
            userFound.password
        );

        if (!doesPasswordMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        if (!userFound.isVerified) {
            throw new UnauthorizedError("User is not verified");
        }

        const userToken = token.sign(userFound);

        return {
            token: userToken,
            user: userFound,
        };
    };
}
