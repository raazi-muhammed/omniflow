import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildGetAllProjectsUseCase({
    projectRepository,
    memberRepository,
}: {
    memberRepository: IMemberRepository;
    projectRepository: IProjectRepository;
}) {
    return async ({ userEmail }: { userEmail: string }) => {
        const user = await memberRepository.getByEmail(userEmail);
        if (!user) return [];

        const projects = await projectRepository.getAll(user.id);
        return projects;
    };
}
