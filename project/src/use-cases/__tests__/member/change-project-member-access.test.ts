import { AccessLevels } from "../../../interfaces/entity.interface.js";
import buildChangeProjectMemberUseCase from "../../member/change-project-member-access.use-case.js";
import { memberRepository, projectRepository } from "../index.js";

const changeProjectMember = buildChangeProjectMemberUseCase({
    memberRepository,
    projectRepository,
});

describe("use case: change project access", () => {
    it("should change access of user if found", async () => {
        await changeProjectMember({
            projectId: "55153a8014829a865bbf700d",
            access: {
                apiDoc: AccessLevels.CAN_EDIT,
                dbDesign: AccessLevels.CAN_EDIT,
                module: AccessLevels.CAN_EDIT,
            },
            userName: "raazi",
        });

        expect(memberRepository.getByUsername).toHaveBeenCalledWith("raazi");
        expect(projectRepository.changeMemberAccess).toHaveBeenCalled();
    });
    it("should throw error if user is not found", () => {
        const fn = () =>
            changeProjectMember({
                projectId: "55153a8014829a865bbf700d",
                access: {
                    apiDoc: AccessLevels.CAN_EDIT,
                    dbDesign: AccessLevels.CAN_EDIT,
                    module: AccessLevels.CAN_EDIT,
                },
                userName: "remi",
            });
        expect(fn).rejects.toThrow();
    });
});
