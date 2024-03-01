import IUserRepository from "../interfaces/repository.interface.js";
import IToken from "../interfaces/token.interface.js";
import { IRequest } from "@omniflow/common";
import { ReposeCreator } from "@omniflow/common";

export default function buildCurrentUserController({
    token,
    userRepository,
}: {
    token: IToken;
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.body.currentUser;
        if (!currentUser) throw new Error("No user found");

        const user = await userRepository.findByUsername(currentUser.username);
        if (!user) throw new Error("Not user found");

        const response = new ReposeCreator();
        return response.setMessage("User logged in").setData(user);
    };
}
