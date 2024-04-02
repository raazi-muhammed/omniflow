import projectModel from "./models/project.model.js";
import memberModel from "./models/members.model.js";
import buildProjectRepository from "./project-list.repository.js";
import buildMemberRepository from "./member-list.repository.js";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";
import {
    memberRepositoryMock,
    projectRepositoryMock,
} from "../__mocks__/index.js";

const isOnTestingEnv = (process.env.NODE_ENV = "test");

const projectRepositoryMongo: IProjectRepository = buildProjectRepository({
    database: projectModel,
});

const memberRepositoryMongo: IMemberRepository = buildMemberRepository({
    database: memberModel,
});

export const projectRepository = isOnTestingEnv
    ? projectRepositoryMock
    : projectRepositoryMongo;

export const memberRepository = isOnTestingEnv
    ? memberRepositoryMock
    : memberRepositoryMongo;
