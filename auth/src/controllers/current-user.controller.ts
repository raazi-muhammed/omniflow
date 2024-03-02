import { IUserRepository } from "../interfaces/repository.interface.js";
import { ErrorHandler, IRequest } from "@omniflow/common";
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
        if (!currentUser) throw new ErrorHandler("Invalid token", 403);

        const user = await userRepository.findByUsername(currentUser.username);
        if (!user) throw new ErrorHandler("User not found", 404);

        const response = new ReposeCreator();
        return response
            .setMessage("User logged in")
            .setData(user)
            .setStatusCode(200);
    };
}
