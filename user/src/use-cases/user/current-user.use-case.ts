import { UserNotFoundError } from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildCurrentUserUseCase({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async ({ username }: { username: string }) => {
        const user = await userRepository.findByUsername(username);
        if (!user) throw new UserNotFoundError();

        return user;
    };
}
