import Team from "../entities/team.entity.js";
import Member from "../entities/member.entity.js";
import buildAddMemberUseCase from "./add-member.use-case.js";
import buildAddTeamUseCase from "./add-team.use-case.js";
import { ITeamUseCase } from "../interfaces/use-case.interface.js";

const addTeam = buildAddTeamUseCase({ Team });
const addMember = buildAddMemberUseCase({ Member });

const teamUseCases: ITeamUseCase = Object.freeze({
    addTeam,
    addMember,
});

export default teamUseCases;
