import { IMemberUseCase } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMemberFromProject({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCase;
}) {
    return async (data: { userEmail: string; projectId: string }) => {
        await memberUseCases.removeMemberFromProject(data);
    };
}
