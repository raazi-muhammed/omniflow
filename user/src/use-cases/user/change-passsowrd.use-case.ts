import {
    AnErrorOccurredError,
    UnauthorizedError,
    UserNotFoundError,
} from "@omniflow/common";
import IPasswordHash from "../../interfaces/password-hash.interface.js";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildChangePasswordUseCase({
    userRepository,
    passwordHash,
}: {
    passwordHash: IPasswordHash;
    userRepository: IUserRepository;
}) {
    return async ({
        currentPassword,
        newPassword,
        username,
    }: {
        currentPassword: string;
        newPassword: string;
        username: string;
    }) => {
        const user = await userRepository.findByUsername(username);
        if (!user) throw new UserNotFoundError();

        const doesPasswordMatch = await passwordHash.compare(
            currentPassword,
            user.password
        );

        if (!doesPasswordMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        const hashedNewPassword = await passwordHash.hash(newPassword);

        const passwordChanged = await userRepository.changePassword({
            userId: user.id,
            newPassword: hashedNewPassword,
        });
        if (!passwordChanged) throw new AnErrorOccurredError();
    };
}
