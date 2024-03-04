import buildCreateProject from "./create-project.use-case.js";
import projectEntities from "../entities/index.js";
import buildCreateMemberUseCases from "./create-member.use-case.js";

const createProject = buildCreateProject(projectEntities.Project);
const createMember = buildCreateMemberUseCases(projectEntities.Member);

export default Object.freeze({
    createProject,
    createMember,
});
