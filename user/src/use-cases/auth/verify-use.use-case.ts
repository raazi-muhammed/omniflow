import {
    AnErrorOccurredError,
    NotFoundError,
    UserNotFoundError,
} from "@omniflow/common";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../../interfaces/repository.interface.js";

export default function buildVerifyUserUseCase({
    verificationCodeRepository,
    userRepository,
}: {
    userRepository: IUserRepository;
    verificationCodeRepository: IVerificationCodeRepository;
}) {
    return async ({ email, code }: { email: string; code: number }) => {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        const verificationCode = await verificationCodeRepository.find({
            userId: user.id,
        });
        if (!verificationCode) {
            throw new NotFoundError("Verification code not found");
        }

        if (verificationCode.code !== code) {
            throw new NotFoundError("Invalid verification code");
        }

        const isVerified = userRepository.verifyUser(email);
        if (!isVerified) throw new AnErrorOccurredError();
    };
}
