import { projectRepository, memberRepository } from "../repository/index.js";
import buildAddProjectController from "./add-project.controller.js";
import projectUseCases from "../use-cases/index.js";

const add = buildAddProjectController({
    memberRepository,
    projectRepository,
    addProjectUseCase: projectUseCases.add,
});

export default Object.freeze({
    add,
});
