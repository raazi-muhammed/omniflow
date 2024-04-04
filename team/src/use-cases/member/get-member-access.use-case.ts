import { NotFoundError } from "@omniflow/common";
import {
    IMemberAccessRepository,
    IMemberRepository,
} from "../../interfaces/repository.interface.js";

export default function buildGetMemberAccessUseCase({
    memberRepository,
    memberAccessRepository,
}: {
    memberRepository: IMemberRepository;
    memberAccessRepository: IMemberAccessRepository;
}) {
    return async ({
        userName,
        projectId,
    }: {
        userName: string;
        projectId: string;
    }) => {
        const member = await memberRepository.getByUsername(userName);

        const memberAccess = await memberAccessRepository.getAccess({
            member: member.id,
            project: projectId,
        });

        return memberAccess;
    };
}
