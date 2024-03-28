import { validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../interfaces/use-case.interface.js";

export default function buildEditMemberController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCase;
}) {
    return async (data: {
        avatar?: string;
        username: string;
        name: string;
    }) => {
        validateBody(data, ["username", "name"]);
        await memberUseCases.editMember(data);
    };
}
