import { NotFoundError } from "@omniflow/common";
import { IAccess } from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildChangeProjectMemberUseCase({
    projectRepository,
    memberRepository,
}: {
    projectRepository: IProjectRepository;
    memberRepository: IMemberRepository;
}) {
    return async ({
        userName,
        projectId,
        access,
    }: {
        userName: string;
        projectId: string;
        access: IAccess;
    }) => {
        const user = await memberRepository.getByUsername(userName);
        if (!user) throw new NotFoundError("User not found");

        await projectRepository.changeMemberAccess({
            projectId,
            access,
            userId: user.id,
        });
    };
}
