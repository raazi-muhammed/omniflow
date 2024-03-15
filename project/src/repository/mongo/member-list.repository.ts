import { IMember } from "../../interfaces/entity.interface.js";
import { IMemberRepository } from "../../interfaces/repository.interface.js";
import { IDBMember, IMemberModel } from "./members.model.js";

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
                { username: memberData.username },
                {
                    username: memberData.username,
                    name: memberData.name,
                    email: memberData.email,
                    avatar: memberData.avatar,
                },
                { upsert: true }
            )) as IDBMember;
        },
        getByUsername: async (username: string) => {
            return (await database.findOne({ username })) as IDBMember;
        },
        getByEmail: async (email: string) => {
            return (await database.findOne({ email })) as IDBMember;
        },
    });
}
