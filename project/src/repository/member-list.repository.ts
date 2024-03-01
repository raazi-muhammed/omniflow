import { IMember } from "../interfaces/entity.interface.js";
import { IMemberRepository } from "../interfaces/repository.interface.js";

export default function buildMemberRepository({ database }): IMemberRepository {
    return Object.freeze({
        add: async (memberData: IMember) => {
            return await database.create(memberData);
        },
        upsert: async (memberData: IMember) => {
            return await database.findOneAndUpdate(
                { username: memberData.username },
                { memberData }
            );
        },
    });
}
