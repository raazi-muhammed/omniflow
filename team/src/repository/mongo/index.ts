import {
    IMemberRepository,
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import buildMemberRepository from "./member-list.repository.js";
import membersModel from "./models/member.model.js";
import buildTeamRepository from "./team-list.repository.js";
import teamModel from "./models/team.model.js";
import buildMemberStatusRepository from "./member-status.repository.js";
import memberStatusModel from "./models/member-status.model.js";

export const teamRepository: ITeamRepository = buildTeamRepository({
    database: teamModel,
});
export const memberRepository: IMemberRepository = buildMemberRepository({
    database: membersModel,
});
export const memberStatusRepository: IMemberStatusRepository =
    buildMemberStatusRepository({
        database: memberStatusModel,
    });
