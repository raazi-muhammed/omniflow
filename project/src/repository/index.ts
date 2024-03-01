import projectModel from "./project.model.js";
import buildProjectRepository from "./project-list.repository.js";

export const projectRepository = buildProjectRepository({
    database: projectModel,
});

export type ProjectListType = typeof projectRepository;
