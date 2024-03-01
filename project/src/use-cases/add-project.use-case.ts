import { IProject, IProjectEntity } from "../interfaces/entity.interface.js";

export default function buildAddProject(Project: IProjectEntity) {
    return async (projectData: IProject) => {
        const user = new Project(projectData);
        user.validate();
        return user.get();
    };
}
