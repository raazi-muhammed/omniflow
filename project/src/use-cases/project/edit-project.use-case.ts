import { IProjectRepository } from "../../interfaces/repository.interface.js";

export default function buildEditProjectUseCase({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async (project: {
        projectId: string;
        title: string;
        description: string;
        dueDate: Date;
        startDate: Date;
        priority: number;
    }) => {
        await projectRepository.edit({
            id: project.projectId,
            title: project.title,
            description: project.description,
            startDate: project.startDate,
            dueDate: project.dueDate,
            priority: project.priority,
        });
    };
}
