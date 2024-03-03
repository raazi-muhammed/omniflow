import { IUserRepository } from "../interfaces/repository.interface.js";
import {
    IRequest,
    UserNotFoundError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { ReposeCreator } from "@omniflow/common";

export default function buildCurrentUserController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new UserUnauthorizedError();

        const user = await userRepository.findByUsername(currentUser.username);
        if (!user) throw new UserNotFoundError();

        const response = new ReposeCreator();
        return response
            .setMessage("User logged in")
            .setData(user)
            .setStatusCode(200);
    };
}
