import { IUserRepository } from "../../interfaces/repository.interface.js";
import {
    IRequest,
    UserNotFoundError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { ResponseCreator } from "@omniflow/common";

export default function buildCurrentUserController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;

        const user = await userRepository.findByUsername(currentUser.username);
        if (!user) throw new UserNotFoundError();

        const response = new ResponseCreator();
        return response
            .setMessage("User logged in")
            .setData(user)
            .setStatusCode(200);
    };
}
