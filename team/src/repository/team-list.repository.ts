import { IDType, IMemberInProject } from "../interfaces/entity.interface.js";
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
            return (await database.findOneAndUpdate(
                {
                    project: projectId,
                    name: "Default",
                },
                {
                    name: "Default",
                    avatar: null,
                    project: projectId,
                    lead: null,
                    members: [],
                },
                { upsert: true, new: true }
            )) as IDBTeam;
        },
        getTeams: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find({ project: projectId })
                .populate("members.info")) as IDBTeam[];
        },
    });
}
