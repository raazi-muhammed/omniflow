import { ErrorHandler, IRequest, ReposeCreator } from "@omniflow/common";
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

        const user = await userRepository.findByEmail(email);
        if (!user) throw new ErrorHandler("Please create an account", 400);

        const verificationCode = await verificationCodeRepository.find({
            user: user._id,
        });
        if (!verificationCode) {
            throw new ErrorHandler("Verification code not found", 404);
        }

        if (verificationCode.code !== code) {
            throw new ErrorHandler("Invalid verification code", 400);
        }

        const isVerified = userRepository.verifyUser(email);
        if (!isVerified) throw new ErrorHandler("An error occurred", 500);

        const response = new ReposeCreator();
        return response.setMessage("Account verified").setStatusCode(200);
    };
}
