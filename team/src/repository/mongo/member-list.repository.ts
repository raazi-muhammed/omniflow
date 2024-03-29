import { IMember } from "../../interfaces/entity.interface.js";
import { IMemberRepository } from "../../interfaces/repository.interface.js";
import { IDBMember, IMemberModel } from "./models/member.model.js";

export default function buildMemberRepository({
    database,
}: {
    database: IMemberModel;
}): IMemberRepository {
    return Object.freeze({
        add: async (memberData: IMember) => {
            return (await database.create(memberData)) as IDBMember;
        },
        upsert: async (memberData: IMember) => {
            return (await database.findOneAndUpdate(
                { email: memberData.email },
                {
                    username: memberData.username,
                    name: memberData.name,
                    email: memberData.email,
                    avatar: memberData.avatar,
                },
                { upsert: true, new: true }
            )) as IDBMember;
        },
        getByUsername: async (username: string) => {
            return (await database.findOne({ username })) as IDBMember;
        },
        getByEmail: async (email: string) => {
            return (await database.findOne({ email })) as IDBMember;
        },
        getById: async (id: string) => {
            return (await database.findOne({ _id: id })) as IDBMember;
        },
    });
}
