import { ErrorHandler, IRequest, ReposeCreator } from "@omniflow/common";
import { IUserRepository } from "../interfaces/repository.interface.js";

export default function buildGetProfileController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new ErrorHandler("No user found", 404);

        const userData = await userRepository.findByEmail(currentUser.email);

        if (!userData) throw new ErrorHandler("Nor user found", 404);

        const response = new ReposeCreator();
        return response.setData(userData).setStatusCode(200);
    };
}
