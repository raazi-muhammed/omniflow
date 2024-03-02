import {
    ErrorHandler,
    IRequest,
    ReposeCreator,
    UserNotFoundError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { IUserRepository } from "../interfaces/repository.interface.js";

export default function buildGetProfileController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new UserUnauthorizedError();

        const userData = await userRepository.findByEmail(currentUser.email);

        if (!userData) throw new UserNotFoundError();

        const response = new ReposeCreator();
        return response.setData(userData).setStatusCode(200);
    };
}
