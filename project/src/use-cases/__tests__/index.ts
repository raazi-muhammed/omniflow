import { MemberMock } from "../../entities/__mocks__/member.mock.js";
import { ProjectMock } from "../../entities/__mocks__/project.mock.js";
import { teamProducersMock } from "../../events/__mocks__/producer/index.js";
import { mockMemberRepository } from "../../repository/__mocks__/member-list.mock.js";
import { mockProjectRepository } from "../../repository/__mocks__/project-list.mock.js";

export const memberRepository = mockMemberRepository;
export const projectRepository = mockProjectRepository;
export const Project = ProjectMock;
export const Member = MemberMock;
export const teamProducers = teamProducersMock;
