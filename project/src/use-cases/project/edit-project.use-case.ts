import { IProjectEntityConstructor } from "../../interfaces/entity.interface.js";
import { IProjectRepository } from "../../interfaces/repository.interface.js";

export default function buildEditProjectUseCase({
    projectRepository,
    ProjectCreator,
}: {
    projectRepository: IProjectRepository;
    ProjectCreator: IProjectEntityConstructor;
}) {
    return async (project: {
        projectId: string;
        title: string;
        description: string;
        dueDate: Date;
        startDate: Date;
        priority: number;
    }) => {
        const projectDB = await projectRepository.get(project.projectId);

        const updatedData = new ProjectCreator({
            id: project.projectId,
            title: project.title,
            description: project.description,
            startDate: project.startDate,
            dueDate: project.dueDate,
            priority: project.priority,
            isDeleted: projectDB.isDeleted,
            lead: projectDB.lead,
            members: projectDB.members,
        });
        updatedData.validate();
        const newData = updatedData.get();

        await projectRepository.edit({
            id: project.projectId,
            title: newData.title,
            description: newData.description,
            startDate: newData.startDate,
            dueDate: newData.dueDate,
            priority: newData.priority,
        });
    };
}
