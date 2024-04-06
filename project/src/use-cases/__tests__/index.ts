import { ProjectMock } from "../../entities/__mocks__/project.mock.js";
import { teamProducersMock } from "../../events/__mocks__/producer/team-producer.mock.js";
import { memberRepositoryMock } from "../../repository/__mocks__/member-list.mock.js";
import { projectRepositoryMock } from "../../repository/__mocks__/project-list.mock.js";

export const memberRepository = memberRepositoryMock;
export const projectRepository = projectRepositoryMock;
export const Project = ProjectMock;
export const teamProducers = teamProducersMock;
