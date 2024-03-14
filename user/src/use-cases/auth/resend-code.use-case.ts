import { AnErrorOccurredError, UserNotFoundError } from "@omniflow/common";
import { IGenerateVerificationCode } from "../../interfaces/lib.interface.js";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../../interfaces/repository.interface.js";
import { IMailService } from "../../lib/send-verification-mail.js";

export default function buildResendCodeUseCase({
    verificationCodeRepository,
    mailService,
    generateCode,
    userRepository,
}: {
    verificationCodeRepository: IVerificationCodeRepository;
    mailService: IMailService;
    generateCode: IGenerateVerificationCode;
    userRepository: IUserRepository;
}) {
    return async ({ email }: { email: string }) => {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        const generatedCode = generateCode();

        const verificationCode = await verificationCodeRepository.upsert({
            code: generatedCode,
            userId: user.id,
        });

        if (!verificationCode) throw new AnErrorOccurredError();

        await mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });
    };
}
