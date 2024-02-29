import IUserRepository from "../interfaces/repository.interface.js";
import IToken from "../interfaces/token.interface.js";
import { IRequest } from "../lib/adapt-request.js";
import ExpressReposeCreator from "../lib/express-response.js";

export default function buildCurrentUserController({
    token,
    userRepository,
}: {
    token: IToken;
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        console.log(req);

        const tokenData = `Bearer ${req.cookies["__omniflow-user-token"]}`;

        console.log({ tokenData });

        token.validate(tokenData);

        const decodedTokenData = await token.verify(tokenData);

        if (!decodedTokenData) throw new Error("Invalid token data");

        const user = await userRepository.findByUsername(
            decodedTokenData.username
        );
        if (!user) throw new Error("Not user found");

        const response = new ExpressReposeCreator();
        return response.setMessage("User logged in").setData(user);
    };
}
