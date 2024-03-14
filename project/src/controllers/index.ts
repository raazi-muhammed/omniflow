import buildAddProjectController from "./project/add-project.controller.js";
import { projectUseCases } from "../use-cases/index.js";
import { IProjectController } from "../interfaces/controller.interface.js";
import buildGetAllProjectsController from "./project/get-projects.controller.js";
import buildGetProjectController from "./project/get-project.controller.js";
import buildGetCurrentProject from "./project/current-project.js";
import buildEditProjectController from "./project/edit-project.controller.js";
import buildDeleteProjectController from "./project/delete-project.controller.js";
import buildAddMemberToProject from "./member/add-project-member.controller.js";
import { memberUseCases } from "../use-cases/index.js";
import buildChangeProjectLeadController from "./member/change-project-lead.controller.js";

const addProject = buildAddProjectController({
    projectUseCases,
});

const editProject = buildEditProjectController({
    projectUseCases,
});

const getProjects = buildGetAllProjectsController({
    projectUseCases,
});
const deleteProject = buildDeleteProjectController({
    projectUseCases,
});
const getProject = buildGetProjectController({ projectUseCases });

const currentProject = buildGetCurrentProject({ projectUseCases });

const addProjectMember = buildAddMemberToProject({
    memberUseCases,
});

const changeProjectLead = buildChangeProjectLeadController({
    projectUseCases,
});

const projectController: IProjectController = Object.freeze({
    addProject,
    editProject,
    deleteProject,
    getProjects,
    getProject,
    currentProject,
    addProjectMember,
    changeProjectLead,
});

export default projectController;
