import projectEntities from "../entities/index.js";
import buildAddMemberToProjectUseCase from "./member/add-project-member.use-case.js";
import {
    projectRepository,
    memberRepository,
} from "../repository/mongo/index.js";
import Member from "../entities/member.entity.js";
import {
    IMemberUseCase,
    IProjectUseCase,
} from "../interfaces/use-case.interface.js";
import buildChangeProjectLeadUseCase from "./project/change-project-lead.use-case.js";
import buildAddProjectUseCase from "./project/add-project.use-case.js";
import buildGetAllProjectsUseCase from "./project/get-projects.use-case.js";
import buildGetProjectUseCase from "./project/get-project.use-case.js";
import { token } from "@omniflow/common";
import buildDeleteProjectUseCase from "./project/delete-project.use-case.js";
import buildEditProjectUseCase from "./project/edit-project.use-case.js";
import buildRemoveMemberFromProjectUseCase from "./member/remove-project-member.use-case.js";
import { teamProducers } from "../events/producer/index.js";
import buildEditMemberUseCase from "./member/edit-member.use-case.js";

const addMemberToProject = buildAddMemberToProjectUseCase({
    projectRepository,
    memberRepository,
    MemberCreator: Member,
});
const changeProjectLead = buildChangeProjectLeadUseCase({
    memberRepository,
    projectRepository,
});

const addProject = buildAddProjectUseCase({
    teamProducers,
    projectRepository,
    memberRepository,
    ProjectCreator: projectEntities.Project,
});
const getAllProjects = buildGetAllProjectsUseCase({
    projectRepository,
    memberRepository,
});

const getProject = buildGetProjectUseCase({ projectRepository, token });

const removeMemberFromProject = buildRemoveMemberFromProjectUseCase({
    projectRepository,
    memberRepository,
});
const editMember = buildEditMemberUseCase({
    memberRepository,
});

const deleteProject = buildDeleteProjectUseCase({ projectRepository });
const editProject = buildEditProjectUseCase({ projectRepository });

export const memberUseCases: IMemberUseCase = Object.freeze({
    addMemberToProject,
    removeMemberFromProject,
    editMember,
});
export const projectUseCases: IProjectUseCase = Object.freeze({
    changeProjectLead,
    addProject,
    deleteProject,
    getAllProjects,
    getProject,
    editProject,
});
