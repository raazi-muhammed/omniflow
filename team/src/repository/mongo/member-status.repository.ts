import { IMemberStatus } from "../../interfaces/entity.interface.js";
import { IMemberStatusRepository } from "../../interfaces/repository.interface.js";
import {
    IDBMemberStatus,
    IMemberStatusModel,
} from "./models/member-status.model.js";
import _ from "lodash";

export default function buildMemberStatusRepository({
    database,
}: {
    database: IMemberStatusModel;
}): IMemberStatusRepository {
    return Object.freeze({
        addMember: async (data: IMemberStatus) => {
            return (await database.create(data)) as IDBMemberStatus;
        },
        removeMemberFromTeam: async ({
            memberId,
            teamName,
            projectId,
        }: {
            memberId: string;
            teamName: string;
            projectId: string;
        }) => {
            const response = await database.updateOne(
                { project: projectId, name: teamName, isDeleted: false },
                {
                    $pull: {
                        members: {
                            info: memberId,
                        },
                    },
                }
            );
            return response.modifiedCount > 0;
        },
        getAllMembers: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find()
                .populate("info")) as IDBMemberStatus[];
        },
    });
}
