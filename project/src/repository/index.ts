import projectModel from "./project.model.js";
import memberModel from "./members.model.js";
import buildProjectRepository from "./project-list.repository.js";
import buildMemberRepository from "./member-list.repository.js";

export const projectRepository = buildProjectRepository({
    database: projectModel,
});

export const memberRepository = buildMemberRepository({
    database: memberModel,
});

export type ProjectListType = typeof projectRepository;
