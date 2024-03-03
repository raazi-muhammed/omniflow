import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import buildMemberRepository from "./member-list.repository.js";
import membersModel from "./members.model.js";
import buildTeamRepository from "./team-list.repository.js";
import teamModel from "./team.model.js";

export const teamRepository: ITeamRepository = buildTeamRepository({
    database: teamModel,
});
export const memberRepository: IMemberRepository = buildMemberRepository({
    database: membersModel,
});
