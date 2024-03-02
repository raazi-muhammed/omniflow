import { IRequest, ReposeCreator } from "@omniflow/common";
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
        if (!user) throw new Error("Please create an account");

        const verificationCode = await verificationCodeRepository.find({
            user: user._id,
        });
        if (!verificationCode) {
            throw new Error("Try resending verification code");
        }

        console.log(verificationCode.code, code);

        if (verificationCode.code !== code) {
            throw new Error("Invalid verification code");
        }

        const isVerified = userRepository.verifyUser(email);
        if (!isVerified) throw new Error("Cannot verify user");

        const response = new ReposeCreator();
        return response.setMessage("Account verified");
    };
}
