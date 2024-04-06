import buildRemoveMemberFromProjectUseCase from "../../member/remove-project-member.use-case.js";
import { memberRepository, projectRepository } from "../index.js";

const removeMemberFromProject = buildRemoveMemberFromProjectUseCase({
    memberRepository,
    projectRepository,
});

describe("use case: add project", () => {
    it("should remove user from project with user is found", async () => {
        await removeMemberFromProject({
            projectId: "55153a8014829a865bbf700d",
            userEmail: "raazi@gmail.com",
        });

        expect(memberRepository.getByEmail).toHaveBeenCalledWith(
            "raazi@gmail.com"
        );
        expect(projectRepository.removeMember).toHaveBeenCalled();
    });
    it("should throw error when user is not found", () => {
        const fn = () =>
            removeMemberFromProject({
                projectId: "55153a8014829a865bbf700d",
                userEmail: "invalid@gmail.com",
            });
        expect(fn).rejects.toThrow();
    });
});
