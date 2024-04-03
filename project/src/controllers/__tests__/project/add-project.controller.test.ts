import { describe, expect, it, test } from "@jest/globals";
import buildGetAllProjectsController from "../../project/get-projects.controller.js";
import { projectUseCases } from "../../../use-cases/index.js";
import { BadRequestError, IRequest } from "@omniflow/common";
import buildAddProjectController from "../../project/add-project.controller.js";

jest.mock("../../../repository/index.js");

const getProjects = buildGetAllProjectsController({
    projectUseCases,
});
const addProject = buildAddProjectController({
    projectUseCases,
});

describe("get projects", () => {
    it("should return an array of projects", async () => {
        const data = await getProjects({
            currentProject,
            currentUser,
        } as IRequest);
        expect(data).toEqual({ data: [], statusCode: 200 });
    });
});

describe("Adding a project", () => {
    describe("without body", () => {
        it("should throw bad request error without body", async () => {
            await expect(
                addProject({
                    body: {},
                    currentProject,
                    currentUser,
                } as IRequest)
            ).rejects.toThrow(new BadRequestError("Invalid data title"));
        });
        it("should throw bad request error without title", async () => {
            await expect(
                addProject({
                    body: {
                        description: "simple project",
                        priority: 1,
                        startDate: new Date(),
                        dueDate: new Date(),
                        lead: "user-id",
                    },
                    currentProject,
                    currentUser,
                } as IRequest)
            ).rejects.toThrow(new BadRequestError("Invalid data title"));
        });
        it("should throw bad request error without description", async () => {
            await expect(
                addProject({
                    body: {
                        title: "project name",
                        description: "simple project",
                        priority: 1,
                        startDate: new Date(),
                        dueDate: new Date(),
                        lead: "user-id",
                    },
                    currentProject,
                    currentUser,
                } as IRequest)
            ).rejects.toThrow(new BadRequestError("Invalid data description"));
        });
    });
});

const currentProject = {
    description: "asdfl",
    dueDate: new Date(),
    members: [],
    priority: 1,
    projectLead: "asdfj",
    startDate: new Date(),
    title: "asdl;fasdf",
    id: "lajsdf",
};
const currentUser = {
    email: "asdl;fj",
    name: "hoo",
    password: "a;lsdjf",
    username: "asl;df",
};
