import {
    AnErrorOccurredError,
    IRequest,
    InternalServerError,
    NotFoundError,
    ReposeCreator,
    UnauthorizedError,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../interfaces/repository.interface.js";

export default function buildVerifyUserController({
    verificationCodeRepository,
    userRepository,
}: {
    userRepository: IUserRepository;
    verificationCodeRepository: IVerificationCodeRepository;
}) {
    return async (req: IRequest) => {
        const { email, code } = req.body;
        validateBody(req.body, ["email", "code"]);

        const user = await userRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        const verificationCode = await verificationCodeRepository.find({
            user: user._id,
        });
        if (!verificationCode) {
            throw new NotFoundError("Verification code not found");
        }

        if (verificationCode.code !== code) {
            throw new NotFoundError("Invalid verification code");
        }

        const isVerified = userRepository.verifyUser(email);
        if (!isVerified) throw new AnErrorOccurredError();

        const response = new ReposeCreator();
        return response.setMessage("Account verified").setStatusCode(200);
    };
}
