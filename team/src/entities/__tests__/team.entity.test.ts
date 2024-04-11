import { describe, expect, it, test } from "@jest/globals";
import Team from "../team.entity.js";
import { ITeam } from "../../interfaces/entity.interface.js";
import { Types } from "mongoose";

describe("team entity", () => {
    const teamData: ITeam = {
        name: "UI/UX",
        project: "55153a8014829a865bbf700d",
    };
    it("should return team data with only name and project", () => {
        const team = new Team(teamData);
        expect(team.get()).toEqual(teamData);
    });
    it("should return team data with avatar", () => {
        const data: ITeam = { ...teamData, avatar: "https://image/avatar.png" };
        const team = new Team(data);
        expect(team.get()).toEqual(data);
    });
    it("should return team data with members", () => {
        const data: ITeam = {
            ...teamData,
            members: [],
        };
        const team = new Team(data);
        expect(team.get()).toEqual(data);
    });
    it("should return team data with members", () => {
        const data: ITeam = {
            ...teamData,
            lead: new Types.ObjectId("55153a8014829a865bbf700d"),
        };
        const team = new Team(data);
        expect(team.get()).toEqual(data);
    });
});
