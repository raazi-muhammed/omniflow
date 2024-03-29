import { validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMemberFromProject({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCase;
}) {
    return async (data: { userEmail: string; projectId: string }) => {
        validateBody(data, ["userEmail", "projectId"]);
        await memberUseCases.removeMemberFromProject(data);
    };
}
