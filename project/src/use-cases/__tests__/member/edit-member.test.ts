import buildEditMemberUseCase from "../../member/edit-member.use-case.js";
import { memberRepository } from "../index.js";

const editMember = buildEditMemberUseCase({
    memberRepository,
});

describe("use case: edit member", () => {
    it("should edit member if found", async () => {
        await editMember({
            name: "raazi",
            username: "raazi",
        });

        expect(memberRepository.editUser).toHaveBeenCalled();
    });
    it("should throw error if user is not found", () => {
        const fn = () =>
            editMember({
                name: "raazi",
                username: "remi",
            });
        expect(fn).rejects.toThrow();
    });
});
