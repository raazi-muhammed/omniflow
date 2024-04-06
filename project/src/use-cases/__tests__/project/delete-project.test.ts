import { describe } from "@jest/globals";
import buildDeleteProjectUseCase from "../../project/delete-project.use-case.js";
import { projectRepository } from "../index.js";

const deleteProject = buildDeleteProjectUseCase({
    projectRepository,
});

describe("use case: delete project", () => {
    it("should delete the project when passed a valid project id", () => {
        deleteProject({ projectId: "55153a8014829a865bbf700d" });
        expect(projectRepository.delete).toHaveBeenCalledWith(
            "55153a8014829a865bbf700d"
        );
    });
    it("should throw an error when passed a invalid project id", () => {
        const fn = () => deleteProject({ projectId: "000" });
        expect(fn).rejects.toThrow();
    });
});
