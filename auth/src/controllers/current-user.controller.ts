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
        const tokenData = `Bearer ${req.cookies["__omniflow-user-token"]}`;

        token.validate(tokenData);

        const decodedTokenData = await token.verify(tokenData);

        if (!decodedTokenData) throw new Error("Invalid token data");

        const user = await userRepository.findByUsername(
            decodedTokenData.username
        );
        if (!user) throw new Error("Not user found");

        const response = new ReposeCreator();
        return response.setMessage("User logged in").setData(user);
    };
}
