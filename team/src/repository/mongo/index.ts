import {
    IMemberAccessRepository,
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
import buildMemberAccessRepository from "./member-access.repository.js";
import memberAccessModel from "./models/member-access.model.js";

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

export const memberAccessRepository: IMemberAccessRepository =
    buildMemberAccessRepository({
        database: memberAccessModel,
    });
