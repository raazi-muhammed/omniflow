import { UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildRemoveMemberFromProjectUseCase({
    projectRepository,
    memberRepository,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
}) {
    return async ({
        userEmail,
        projectId,
    }: {
        userEmail: string;
        projectId: string;
    }) => {
        const userFound = await memberRepository.getByEmail(userEmail);
        if (!userFound) throw new UserNotFoundError();

        await projectRepository.removeMember({
            projectId,
            memberId: userFound.id,
        });
    };
}
