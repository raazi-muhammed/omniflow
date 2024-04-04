import { IMemberAccess } from "../../interfaces/entity.interface.js";
import { IMemberAccessRepository } from "../../interfaces/repository.interface.js";
import {
    IDBMemberAccess,
    IMemberAccessModel,
} from "./models/member-access.model.js";

export default function buildMemberAccessRepository({
    database,
}: {
    database: IMemberAccessModel;
}): IMemberAccessRepository {
    return Object.freeze({
        upsertAccess: async (memberData: IMemberAccess) => {
            return (await database.findOneAndUpdate(
                {
                    member: memberData.member,
                    project: memberData.project,
                },
                memberData,
                { upsert: true, new: true }
            )) as IDBMemberAccess;
        },
        getAccess: async (memberData: { project: string; member: string }) => {
            return (await database.findOne({
                member: memberData.member,
                project: memberData.project,
            })) as IDBMemberAccess;
        },
    });
}
