import { describe, it } from "@jest/globals";
import { memberRepository, projectRepository } from "../index.js";
import buildChangeProjectLeadUseCase from "../../project/change-project-lead.use-case.js";

const changeProjectLead = buildChangeProjectLeadUseCase({
    memberRepository,
    projectRepository,
});

describe("use case: change project lead", () => {
    it("should change project lead with valid data", async () => {
        await changeProjectLead({
            leadEmail: "raazi@gmail.com",
            projectId: "55153a8014829a865bbf700d",
        });
        expect(projectRepository.changeTeamLead).toHaveBeenCalled();
        expect(memberRepository.getByEmail).toHaveBeenCalled();
    });
    it("should throw error when user is not found", async () => {
        const call = async () =>
            await changeProjectLead({
                leadEmail: "invalid@gmail.com",
                projectId: "55153a8014829a865bbf700d",
            });

        expect(call).rejects.toThrow();
    });
    it("should throw error when project is not found", async () => {
        const call = async () =>
            await changeProjectLead({
                leadEmail: "raazi@gmail.com",
                projectId: "55153a8014829a86",
            });

        expect(call).rejects.toThrow();
    });
});
