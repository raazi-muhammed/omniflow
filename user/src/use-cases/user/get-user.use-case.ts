import { UserNotFoundError } from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildGetProfileUseCase({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async ({ username }: { username: string }) => {
        const userData = await userRepository.findByUsername(username);
        if (!userData) throw new UserNotFoundError();

        return userData;
    };
}
