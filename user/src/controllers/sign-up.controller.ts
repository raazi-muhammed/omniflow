import { IUser } from "../interfaces/entity.interface.js";
import { ISignInUseCase } from "../interfaces/use-case.interface.js";
import {
    validateBody,
    ReposeCreator,
    IRequest,
    ConflictError,
    AnErrorOccurredError,
} from "@omniflow/common";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../interfaces/repository.interface.js";
import IPasswordHash from "../interfaces/password-hash.interface.js";
import { IMailService } from "../lib/mail-server.js";
import { IGenerateVerificationCode } from "../interfaces/lib.interface.js";

export default function buildSignInController({
    signInUseCase,
    userRepository,
    passwordHash,
    mailService,
    generateCode,
    verificationCodeRepository,
}: {
    signInUseCase: ISignInUseCase;
    userRepository: IUserRepository;
    passwordHash: IPasswordHash;
    mailService: IMailService;
    generateCode: IGenerateVerificationCode;
    verificationCodeRepository: IVerificationCodeRepository;
}) {
    return async (req: IRequest) => {
        const userData: IUser = req.body;
        validateBody(userData, ["username", "email", "password", "name"]);

        const user = await signInUseCase({ ...userData, isVerified: false });

        const userWithSameMail = await userRepository.findByEmail(user.email);
        if (userWithSameMail) {
            throw new ConflictError("Email already registered");
        }

        const userWithSameUsername = await userRepository.findByUsername(
            user.username
        );
        if (userWithSameUsername) {
            throw new ConflictError("Username already registered");
        }

        const hashedPassword = await passwordHash.hash(user.password);
        if (!hashedPassword) throw new AnErrorOccurredError();

        const isUserCreated = await userRepository.add({
            ...user,
            password: hashedPassword,
        });
        if (!isUserCreated) throw new AnErrorOccurredError();

        const generatedCode = generateCode();

        const verificationCode = await verificationCodeRepository.upsert({
            code: generatedCode,
            user: isUserCreated._id,
        });

        if (!verificationCode) {
            throw new AnErrorOccurredError();
        }

        mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });

        const response = new ReposeCreator();
        return response
            .setStatusCode(201)
            .setMessage("Please check your mail for verification code");
    };
}
