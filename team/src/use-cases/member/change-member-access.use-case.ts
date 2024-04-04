import { AnErrorOccurredError, NotFoundError } from "@omniflow/common";
import { IAccess } from "../../interfaces/entity.interface.js";
import {
    IMemberAccessRepository,
    IMemberRepository,
} from "../../interfaces/repository.interface.js";
import { IMemberProducers } from "../../interfaces/broker.interface.js";

export default function buildChangeMemberAccessUseCase({
    memberRepository,
    memberAccessRepository,
    memberProducers,
}: {
    memberRepository: IMemberRepository;
    memberAccessRepository: IMemberAccessRepository;
    memberProducers: IMemberProducers;
}) {
    return async ({
        userName,
        projectId,
        access,
    }: {
        userName: string;
        projectId: string;
        access: IAccess;
    }) => {
        const member = await memberRepository.getByUsername(userName);
        if (!member) throw new NotFoundError("Member not found");

        const memberAccess = await memberAccessRepository.upsertAccess({
            deletedAt: null,
            member: member.id,
            project: projectId,
            access,
        });
        if (!memberAccess) throw new AnErrorOccurredError();

        await memberProducers.changeMemberAccess({
            access: memberAccess.access,
            projectId,
            userName,
        });

        return memberAccess;
    };
}
