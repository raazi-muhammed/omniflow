import {
    IMember,
    IMemberEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateMemberUseCases(
    Member: IMemberEntityConstructor
) {
    return (data: IMember) => {
        const member = new Member(data);
        return member.get();
    };
}
