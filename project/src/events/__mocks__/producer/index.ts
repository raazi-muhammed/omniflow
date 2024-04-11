import { ITeamProducers } from "../../../interfaces/broker.interface.js";
import { jest } from "@jest/globals";

export const teamProducers: ITeamProducers = {
    addMemberToTeam: jest.fn((data) => Promise.resolve()),
};
