import { describe, expect, test } from "@jest/globals";
import buildGetAllProjectsUseCase from "../../project/get-projects.use-case.js";
import { memberRepository, projectRepository } from "../index.js";

const getAllProjects = buildGetAllProjectsUseCase({
    memberRepository,
    projectRepository,
});

describe("use case: get projects", () => {
    it("get empty array with user is not found", async () => {
        const data = await getAllProjects({
            userEmail: "raazi6163@gmail.com",
        });
        expect(memberRepository.getByEmail).toHaveBeenCalledWith(
            "raazi6163@gmail.com"
        );
        expect(projectRepository.getAll).not.toHaveBeenCalled();
        expect(data).toEqual([]);
    });
    it("get array of project when user is found", async () => {
        const data = await getAllProjects({
            userEmail: "raazi@gmail.com",
        });
        expect(memberRepository.getByEmail).toHaveBeenCalledWith(
            "raazi@gmail.com"
        );
        expect(projectRepository.getAll).toHaveBeenCalledTimes(1);
        expect(data.length).toBeGreaterThan(0);
    });
});
