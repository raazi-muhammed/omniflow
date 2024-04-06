import { it } from "@jest/globals";
import buildAddMemberToProjectUseCase from "../../member/add-project-member.use-case.js";
import { Member, memberRepository, projectRepository } from "../index.js";
import { AccessLevels } from "../../../interfaces/entity.interface.js";

const addMemberToProject = buildAddMemberToProjectUseCase({
    memberRepository,
    projectRepository,
    MemberCreator: Member,
});

describe("use case: add project member", () => {
    it("should add member to project when user is in database", async () => {
        await addMemberToProject({
            userData: {
                email: "raazi@gmial.com",
                name: "raazi",
                username: "raazi",
                access: {
                    apiDoc: AccessLevels.CAN_EDIT,
                    dbDesign: AccessLevels.CAN_EDIT,
                    module: AccessLevels.CAN_EDIT,
                },
            },
            projectId: "55153a8014829a865bbf700d",
        });

        expect(Member).toHaveBeenCalled();
        expect(memberRepository.getByUsername).toHaveBeenCalledWith("raazi");
        expect(projectRepository.addMember).toHaveBeenCalled();
    });
    it("should add member to project after create user if user is not found on database", async () => {
        await addMemberToProject({
            userData: {
                email: "raazi@gmial.com",
                name: "remi",
                username: "remi",
                access: {
                    apiDoc: AccessLevels.CAN_EDIT,
                    dbDesign: AccessLevels.CAN_EDIT,
                    module: AccessLevels.CAN_EDIT,
                },
            },
            projectId: "55153a8014829a865bbf700d",
        });

        expect(Member).toHaveBeenCalled();
        expect(memberRepository.getByUsername).toHaveBeenCalledWith("remi");
        expect(projectRepository.addMember).toHaveBeenCalled();
    });
});
