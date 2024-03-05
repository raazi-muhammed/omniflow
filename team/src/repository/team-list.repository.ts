import { Types, isValidObjectId } from "mongoose";
import {
    IDType,
    IMemberInProject,
    ITeam,
    InviteStatus,
    Role,
} from "../interfaces/entity.interface.js";
import {
    IAllMemberList,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { IDBTeam, ITeamModel } from "./team.model.js";
import _ from "lodash";

export default function buildTeamRepository({
    database,
}: {
    database: ITeamModel;
}): ITeamRepository {
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
                isDeleted: false,
            });
            if (team) return team as IDBTeam;

            const upsertTeam = await database.create({
                name: "Default",
                avatar: null,
                project: projectId,
                lead: null,
                isDeleted: false,
                members: [],
            });
            return upsertTeam as IDBTeam;
        },
        getTeams: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find({ project: projectId, isDeleted: false })
                .populate("members.info")) as IDBTeam[];
        },
        getTeam: async ({
            projectId,
            teamName,
        }: {
            projectId: string;
            teamName: string;
        }) => {
            return (await database
                .findOne({
                    project: projectId,
                    name: teamName,
                    isDeleted: false,
                })
                .populate("members.info")) as IDBTeam;
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
            response.members = response.members.map((m) => {
                if (m.info.toString() == userId) {
                    return {
                        ...m,
                        role: Role.TEAM_LEAD,
                    };
                }
                return {
                    ...m,
                    role: Role.DEFAULT,
                };
            });
            response.save();
            return true;
        },
        add: async (data: ITeam) => {
            return (await database.create(data)) as IDBTeam;
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
        addMemberToTeam: async ({
            member,
            teamName,
            projectId,
        }: {
            member: IMemberInProject;
            teamName: string;
            projectId: string;
        }) => {
            const response = await database.updateOne(
                { project: projectId, name: teamName, isDeleted: false },
                {
                    $addToSet: {
                        members: member,
                    },
                }
            );
            return response.modifiedCount > 0;
        },
        invitationAccepted: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const data = await database.updateOne(
                {
                    project: projectId,
                    "members.info": memberId,
                },
                {
                    $set: {
                        "members.$.inviteStatus": InviteStatus.ACCEPTED,
                    },
                }
            );
            return data.modifiedCount > 0;
        },
        invitationRejected: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const data = await database.updateOne(
                {
                    project: projectId,
                    "members.info": memberId,
                },
                {
                    $set: {
                        "members.$.inviteStatus": InviteStatus.REJECTED,
                    },
                }
            );
            return data.modifiedCount > 0;
        },
        getAllMembers: async ({ projectId }: { projectId: string }) => {
            const data = await database.aggregate([
                {
                    $unwind: "$members",
                },
                {
                    $match: {
                        project: projectId,
                        "members.info": { $exists: true },
                        "members.inviteStatus": InviteStatus.ACCEPTED,
                    },
                },
                {
                    $lookup: {
                        from: "members",
                        localField: "members.info",
                        foreignField: "_id",
                        as: "memberDetails",
                    },
                },
                {
                    $unwind: "$memberDetails",
                },
                {
                    $project: {
                        _id: 0,
                        team: "$name",
                        project: 1,
                        info: "$memberDetails",
                    },
                },
            ]);
            const uniqueData = _.uniqBy(data, function (e) {
                return e.info.email;
            });
            return uniqueData as IAllMemberList[];
        },
    });
}
