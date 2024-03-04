import { projectRepository, memberRepository } from "../repository/index.js";
import buildAddProjectController from "./add-project.controller.js";
import projectUseCases from "../use-cases/index.js";
import { IProjectController } from "../interfaces/controller.interface.js";
import buildGetAllProjectsController from "./get-all-projects.controller.js";
import buildGetProjectController from "./get-project.controller.js";
import { token } from "@omniflow/common";
import buildGetCurrentProject from "./get-current-project.js";
import buildEditProjectController from "./edit-project.controller.js";
import buildDeleteProjectController from "./delete-project.controller.js";

const add = buildAddProjectController({
    memberRepository,
    projectRepository,
    addProjectUseCase: projectUseCases.add,
});

const edit = buildEditProjectController({
    projectRepository,
    addProjectUseCase: projectUseCases.add,
});

const getAll = buildGetAllProjectsController({
    memberRepository,
    projectRepository,
});
const deleteProject = buildDeleteProjectController({
    projectRepository,
});
const getProject = buildGetProjectController({ token, projectRepository });

const currentProject = buildGetCurrentProject({ projectRepository });
const projectController: IProjectController = Object.freeze({
    add,
    edit,
    deleteProject,
    getAll,
    getProject,
    currentProject,
});
export default projectController;
