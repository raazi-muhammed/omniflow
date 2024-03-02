import IUserRepository from "../interfaces/repository.interface.js";
import { IRequest } from "@omniflow/common";
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
        console.log({ currentUser: req.currentUser }, { body: req.body });

        const currentUser = req.currentUser;
        if (!currentUser) throw new Error("No user found");

        const user = await userRepository.findByUsername(currentUser.username);
        if (!user) throw new Error("Not user found");

        const response = new ReposeCreator();
        return response.setMessage("User logged in").setData(user);
    };
}
