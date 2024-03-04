import {
    IProject,
    IProjectEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateProject(Project: IProjectEntityConstructor) {
    return (projectData: IProject) => {
        const user = new Project(projectData);
        user.validate();
        return user.get();
    };
}
