import { projectRepository, memberRepository } from "../repository/index.js";
import buildAddProjectController from "./project/add-project.controller.js";
import projectUseCases from "../use-cases/index.js";
import { IProjectController } from "../interfaces/controller.interface.js";
import buildGetAllProjectsController from "./project/get-projects.controller.js";
import buildGetProjectController from "./project/get-project.controller.js";
import { token } from "@omniflow/common";
import buildGetCurrentProject from "./project/current-project.js";
import buildEditProjectController from "./project/edit-project.controller.js";
import buildDeleteProjectController from "./project/delete-project.controller.js";
import buildAddMemberToProject from "./member/add-project-member.js";
import useCases from "../use-cases/index.js";
import buildChangeProjectLeadController from "./member/change-project-lead.controller.js";

const addProject = buildAddProjectController({
    memberRepository,
    projectRepository,
    createProject: projectUseCases.createProject,
});

const editProject = buildEditProjectController({
    projectRepository,
    createProject: projectUseCases.createProject,
});

const getProjects = buildGetAllProjectsController({
    memberRepository,
    projectRepository,
});
const deleteProject = buildDeleteProjectController({
    projectRepository,
});
const getProject = buildGetProjectController({ token, projectRepository });

const currentProject = buildGetCurrentProject({ token, projectRepository });

const addProjectMember = buildAddMemberToProject({
    createMember: useCases.createMember,
    memberRepository,
    projectRepository,
});

const changeProjectLead = buildChangeProjectLeadController({
    memberRepository,
    projectRepository,
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
