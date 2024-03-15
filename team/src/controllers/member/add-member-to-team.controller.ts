import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddMemberToTeamController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async ({
        userData,
        projectId,
    }: {
        userData: { avatar: string; username: string; email: string };
        projectId: string;
    }) => {
        await memberUseCases.addMemberToTeam({
            projectId,
            member: userData,
        });
    };
}
