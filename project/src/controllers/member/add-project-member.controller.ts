import { IMember } from "../../interfaces/entity.interface.js";
import { IMemberUseCase } from "../../interfaces/use-case.interface.js";

export default function buildAddMemberToProject({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCase;
}) {
    return async (data: {
        userData: { username: string; avatar?: string; email: string };
        projectId: string;
    }) => {
        await memberUseCases.addMemberToProject(data);
    };
}
