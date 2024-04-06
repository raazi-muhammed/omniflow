import { describe, expect, test } from "@jest/globals";
import { memberRepository, projectRepository } from "../index.js";
import buildGetProjectUseCase from "../../project/get-project.use-case.js";
import { BadRequestError, token } from "@omniflow/common";

const getProject = buildGetProjectUseCase({
    memberRepository,
    projectRepository,
    token: token,
});

describe("use case: get project", () => {
    it("get project details with valid input", async () => {
        const data = await getProject({
            projectId: "project-id",
            user: {
                email: "raazi@gmail.com",
                name: "raazi",
                password: "test",
                username: "raazi",
            },
        });
        expect(memberRepository.getByUsername).toHaveBeenCalledWith("raazi");
        expect(projectRepository.get).toHaveBeenCalledWith("project-id");
    });
    it("throw an error and user is not a member in the project", async () => {
        const fn = async () =>
            await getProject({
                projectId: "project-id",
                user: {
                    email: "raazi@gmail.com",
                    name: "raazi",
                    password: "test",
                    username: "invalid-user",
                },
            });
        expect(fn).rejects.toThrow();
    });
});
