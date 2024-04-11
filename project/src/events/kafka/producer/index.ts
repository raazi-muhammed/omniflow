import { ITeamProducers } from "../../../interfaces/broker.interface.js";
import { producer } from "../index.js";
import { buildAddMemberToTeamProducer } from "./add-member-to-team.producer.js";

const addMemberToTeam = buildAddMemberToTeamProducer(producer);

export const teamProducers: ITeamProducers = {
    addMemberToTeam,
};
