import { describe, expect } from "@jest/globals";
import { Project, projectRepository } from "../index.js";
import buildEditProjectUseCase from "../../project/edit-project.use-case.js";

const editProject = buildEditProjectUseCase({
    projectRepository,
    ProjectCreator: Project,
});

describe("use case: edit project", () => {
    it("edits the project with proper data", async () => {
        await editProject({
            title: "shop",
            description: "sample project",
            dueDate: new Date(),
            priority: 1,
            projectId: "asdlfaj",
            startDate: new Date(),
        });

        expect(Project).toHaveBeenCalled();
        expect(projectRepository.edit).toHaveBeenCalledTimes(1);
    });
});
