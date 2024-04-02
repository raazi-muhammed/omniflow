import { ITeamProducers } from "../../interfaces/broker.interface.js";

export const teamProducersMock: ITeamProducers = {
    addMemberToTeam: jest.fn((data) => Promise.resolve()),
};
