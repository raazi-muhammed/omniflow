import {
    IMember,
    IMemberEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildAddMemberUseCase({
    Member,
}: {
    Member: IMemberEntityConstructor;
}) {
    return (data: IMember) => {
        const team = new Member(data);
        return team.get();
    };
}
