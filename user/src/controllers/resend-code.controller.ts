import {
    AnErrorOccurredError,
    ErrorHandler,
    IRequest,
    ReposeCreator,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../interfaces/repository.interface.js";
import { IMailService } from "../lib/mail-server.js";
import { IGenerateVerificationCode } from "../interfaces/lib.interface.js";

export default function buildResendCodeUpController({
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
    return async (req: IRequest) => {
        const userBody = req.body;
        validateBody(userBody, ["email"]);

        const user = await userRepository.findByEmail(userBody.email);
        if (!user) throw new UserNotFoundError();

        const generatedCode = generateCode();

        const verificationCode = await verificationCodeRepository.upsert({
            code: generatedCode,
            user: user._id,
        });

        if (!verificationCode) throw new AnErrorOccurredError();

        mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });

        const response = new ReposeCreator();
        return response.setMessage("Mail sent").setStatusCode(201);
    };
}
