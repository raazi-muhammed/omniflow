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
        let user = await memberRepository.getByUsername(userName);

        await projectRepository.changeMemberAccess({
            projectId,
            access,
            userId: user.id,
        });
    };
}
