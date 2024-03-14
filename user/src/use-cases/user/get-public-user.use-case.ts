import { UserNotFoundError } from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildGetPublicUserUseCase({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async ({ email }: { email: string }) => {
        const userDetails = await userRepository.findByEmail(email);
        if (!userDetails) throw new UserNotFoundError();

        const detailsToShow = {
            email: userDetails.email,
            username: userDetails.username,
            avatar: userDetails.avatar,
            name: userDetails.name,
        };

        return detailsToShow;
    };
}
