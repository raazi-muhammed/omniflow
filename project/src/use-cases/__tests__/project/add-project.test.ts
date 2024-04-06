import { describe, it } from "@jest/globals";
import buildAddProjectUseCase from "../../project/add-project.use-case.js";
import {
    memberRepository,
    projectRepository,
    Project,
    teamProducers,
} from "../index.js";

const addProject = buildAddProjectUseCase({
    memberRepository,
    ProjectCreator: Project,
    projectRepository,
    teamProducers,
});

describe("use case: add project", () => {
    it("should add project with when member is already in db", async () => {
        await addProject({
            member: {
                email: "raazi@gmail.com",
                name: "ho",
                password: "asdf",
                username: "raazi",
            },
            projectData: {
                description: "hoo",
                dueDate: new Date(),
                priority: 1,
                startDate: new Date(),
                title: "ho",
            },
        });
        expect(projectRepository.add).toHaveBeenCalled();
        expect(teamProducers.addMemberToTeam).toHaveBeenCalled();
    });
    it("should add project with and create member when member is not in db", async () => {
        await addProject({
            member: {
                email: "remi@gmail.com",
                name: "ho",
                password: "asdf",
                username: "raazi",
            },
            projectData: {
                description: "hoo",
                dueDate: new Date(),
                priority: 1,
                startDate: new Date(),
                title: "ho",
            },
        });

        expect(projectRepository.add).toHaveBeenCalled();
        expect(teamProducers.addMemberToTeam).toHaveBeenCalled();
    });
});
