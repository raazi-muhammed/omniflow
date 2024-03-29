import { Types } from "mongoose";
import { ITeam } from "../../interfaces/entity.interface.js";
import { ITeamRepository } from "../../interfaces/repository.interface.js";
import { IDBTeam, ITeamModel } from "./models/team.model.js";
import _ from "lodash";

export default function buildTeamRepository({
    database,
}: {
    database: ITeamModel;
}): ITeamRepository {
    return Object.freeze({
        getDefaultTeam: async ({ projectId }: { projectId: string }) => {
            const team = await database.findOne({
                project: projectId,
                name: "Default",
                isDeleted: false,
            });
            if (team) return team as IDBTeam;

            const upsertTeam = await database.create({
                name: "Default",
                avatar: null,
                project: projectId,
                lead: null,
                isDeleted: false,
            });
            return upsertTeam as IDBTeam;
        },
        getTeams: async ({ projectId }: { projectId: string }) => {
            const data = await database
                .find({ project: projectId, isDeleted: false })
                .populate("lead");

            return data as IDBTeam[];
        },
        getTeam: async ({
            projectId,
            teamName,
        }: {
            projectId: string;
            teamName: string;
        }) => {
            const data = await database
                .findOne({
                    project: projectId,
                    name: teamName,
                    isDeleted: false,
                })
                .populate("lead");

            return data as IDBTeam;
        },
        removeTeam: async ({
            projectId,
            teamName,
        }: {
            projectId: string;
            teamName: string;
        }) => {
            const response = await database.updateOne(
                { project: projectId, name: teamName, isDeleted: false },
                { isDeleted: true }
            );
            return response.acknowledged;
        },
        changeTeamLead: async ({
            projectId,
            teamName,
            userId,
        }: {
            projectId: string;
            teamName: string;
            userId: string;
        }) => {
            const response = await database.findOne({
                project: projectId,
                name: teamName,
                isDeleted: false,
            });

            response.lead = new Types.ObjectId(userId);
            response.save();
            return true;
        },
        add: async (data: ITeam) => {
            return (await database.create(data)) as IDBTeam;
        },
    });
}
