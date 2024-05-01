import { UserNotFoundError } from "@omniflow/common";
import { IMemberRepository } from "../../interfaces/repository.interface.js";

export default function buildEditMemberUseCase({
    memberRepository,
}: {
    memberRepository: IMemberRepository;
}) {
    return async (data: {
        avatar?: string;
        username: string;
        name: string;
    }) => {
        const userFound = await memberRepository.editUser(data);
        if (!userFound) throw new UserNotFoundError();
    };
}
