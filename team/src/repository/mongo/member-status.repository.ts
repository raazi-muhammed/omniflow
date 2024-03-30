import {
    IMemberStatus,
    InviteStatus,
} from "../../interfaces/entity.interface.js";
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
                .find({ project: projectId, deletedAt: null })
                .populate("info")) as IDBMemberStatus[];
        },
        getMember: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            return (await database
                .findOne({
                    project: projectId,
                    info: memberId,
                    deletedAt: null,
                })
                .populate("info")) as IDBMemberStatus;
        },
        getMembersFromTeam: async ({
            projectId,
            teamId,
        }: {
            projectId: string;
            teamId: string;
        }) => {
            return (await database
                .find({ project: projectId, team: teamId })
                .populate("info")) as IDBMemberStatus[];
        },
        changeTeamName: async ({}) => {},
        removeMemberFromProject: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const deleted = await database.updateOne(
                {
                    project: projectId,
                    info: memberId,
                    deletedAt: null,
                },
                {
                    deletedAt: new Date(),
                }
            );
            return deleted.matchedCount > 0;
        },
        invitationAccepted: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const updated = await database.updateOne(
                {
                    project: projectId,
                    info: memberId,
                    deletedAt: null,
                },
                {
                    inviteStatus: InviteStatus.ACCEPTED,
                }
            );
            return updated.modifiedCount > 0;
        },
        invitationRejected: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const updated = await database.updateOne(
                {
                    project: projectId,
                    info: memberId,
                    deletedAt: null,
                },
                {
                    inviteStatus: InviteStatus.REJECTED,
                }
            );
            return updated.modifiedCount > 0;
        },
    });
}
