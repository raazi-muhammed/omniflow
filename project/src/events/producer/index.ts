import { ITeamProducers } from "../../interfaces/broker.interface.js";
import { teamProducersMock } from "../__mocks__/index.js";
import { producer } from "../index.js";
import { buildAddMemberToTeamProducer } from "./add-member-to-team.producer.js";

const addMemberToTeam = buildAddMemberToTeamProducer(producer);

const teamProducersKafka = {
    addMemberToTeam,
};

const isOnTestingEnv = (process.env.NODE_ENV = "test");

export const teamProducers: ITeamProducers = isOnTestingEnv
    ? teamProducersMock
    : teamProducersKafka;
