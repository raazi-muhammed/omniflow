import { describe, expect, test } from "@jest/globals";
import buildGetAllProjectsController from "../project/get-projects.controller.js";
import { projectUseCases } from "../../use-cases/index.js";
import { BadRequestError, IRequest } from "@omniflow/common";
import buildAddProjectController from "../project/add-project.controller.js";

const getProjects = buildGetAllProjectsController({
    projectUseCases,
});
const addProject = buildAddProjectController({
    projectUseCases,
});

describe("sum module", () => {
    test("adds 1 + 2 to equal 3", async () => {
        const data = await getProjects({
            body: { hi: "jlasdf" },
            currentProject,
            currentUser,
        } as IRequest);

        expect(data).toEqual({ data: [], statusCode: 200 });
    });
    test("add project", async () => {
        await expect(
            addProject({
                body: { title: "jlasdf" },
                currentProject: {
                    description: "asdfl",
                    dueDate: new Date(),
                    members: [],
                    priority: 1,
                    projectLead: "asdfj",
                    startDate: new Date(),
                    title: "asdl;fasdf",
                    id: "lajsdf",
                },
                currentUser: {
                    email: "asdl;fj",
                    name: "hoo",
                    password: "a;lsdjf",
                    username: "asl;df",
                },
            } as IRequest)
        ).rejects.toThrow(new BadRequestError("Invalid data description"));
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
