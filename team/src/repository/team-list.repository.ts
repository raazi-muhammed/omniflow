import {
    IDType,
    IMemberInProject,
    ITeam,
} from "../interfaces/entity.interface.js";
import { IDBTeam, ITeamModel } from "./team.model.js";

export default function buildTeamRepository({
    database,
}: {
    database: ITeamModel;
}) {
    return Object.freeze({
        addMember: async ({
            teamId,
            member,
        }: {
            teamId: IDType;
            member: IMemberInProject;
        }) => {
            return (await database.findOneAndUpdate(
                { _id: teamId },
                {
                    $addToSet: { members: member },
                }
            )) as IDBTeam;
        },
        getDefaultTeam: async ({ projectId }: { projectId: string }) => {
            const team = await database.findOne({
                project: projectId,
                name: "Default",
            });
            if (team) return team as IDBTeam;

            const upsertTeam = await database.create({
                name: "Default",
                avatar: null,
                project: projectId,
                lead: null,
                members: [],
            });
            return upsertTeam as IDBTeam;
        },
        getTeams: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find({ project: projectId })
                .populate("members.info")) as IDBTeam[];
        },
        add: async (data: ITeam) => {
            return (await database.create(data)) as IDBTeam;
        },
    });
}
