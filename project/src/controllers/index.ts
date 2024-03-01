import { projectRepository, memberRepository } from "../repository/index.js";
import buildAddProjectController from "./add-project.controller.js";
import projectUseCases from "../use-cases/index.js";
import { IProjectController } from "../interfaces/controller.interface.js";
import buildGetAllProjectsController from "./get-all-projects.controller.js";
import buildGetProjectController from "./get-project.controller.js";

const add = buildAddProjectController({
    memberRepository,
    projectRepository,
    addProjectUseCase: projectUseCases.add,
});

const getAll = buildGetAllProjectsController({ projectRepository });
const getProject = buildGetProjectController({ projectRepository });

const projectController: IProjectController = Object.freeze({
    add,
    getAll,
    getProject,
});
export default projectController;
