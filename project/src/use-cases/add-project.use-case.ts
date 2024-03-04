import {
    IProject,
    IProjectEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildAddProject(Project: IProjectEntityConstructor) {
    return async (projectData: IProject) => {
        const user = new Project(projectData);
        user.validate();
        return user.get();
    };
}
