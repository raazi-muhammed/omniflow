import { IUserRepository } from "../interfaces/repository.interface.js";
import {
    ErrorHandler,
    IRequest,
    UserNotFoundError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { ReposeCreator, IToken } from "@omniflow/common";
import { IUser } from "../interfaces/entity.interface.js";

export default function buildCurrentUserController({
    token,
    userRepository,
}: {
    token: IToken<IUser>;
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
