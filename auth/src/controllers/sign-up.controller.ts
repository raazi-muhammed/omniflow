import { IUser } from "../interfaces/entity.interface.js";
import { ISignInUseCase } from "../interfaces/use-case.interface.js";
import { validateBody, ReposeCreator, IRequest } from "@omniflow/common";
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
        if (userWithSameMail) throw new Error("email taken");

        const userWithSameUsername = await userRepository.findByUsername(
            user.username
        );
        if (userWithSameUsername) throw new Error("username taken");

        const hashedPassword = await passwordHash.hash(user.password);
        if (!hashedPassword) throw new Error("An error occurred in password");

        const isUserCreated = await userRepository.add({
            ...user,
            password: hashedPassword,
        });
        if (!isUserCreated) throw new Error("Cannot create user");

        const verificationCodeNum = generateCode();

        const verificationCode = await verificationCodeRepository.add({
            code: verificationCodeNum,
            user: isUserCreated._id,
        });

        mailService.send({
            email: user.email,
            subject: "verification code from omniflow",
            message: `your code is ${verificationCode.code}`,
        });

        const response = new ReposeCreator();
        return response
            .setData(user)
            .setStatusCode(201)
            .setMessage("Verification mail send ");
    };
}
