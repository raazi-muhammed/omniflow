import { AnErrorOccurredError, ConflictError, loadEnv } from "@omniflow/common";
import {
    IMemberRepository,
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import {
    IMemberEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";

export default function buildAddProjectLeadUseCase({
    memberRepository,
    MemberCreator,
    memberStatusRepository,
}: {
    memberRepository: IMemberRepository;
    MemberCreator: IMemberEntityConstructor;
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({
        email,
        username,
        avatar,
        projectId,
        name,
    }: {
        email: string;
        username: string;
        avatar?: string;
        projectId: string;
        name: string;
    }) => {
        let userToAdd = await memberRepository.getByEmail(email);
        if (!userToAdd) {
            const memberEntity = new MemberCreator({
                email,
                username,
                name,
                avatar,
            });
            const memberToAdd = memberEntity.get();

            userToAdd = await memberRepository.upsert(memberToAdd);
            if (!userToAdd) {
                throw new AnErrorOccurredError();
            }
        }

        const memberAlready = await memberStatusRepository.getMember({
            projectId,
            memberId: userToAdd.id,
        });
        if (memberAlready) {
            throw new ConflictError("User is already added");
        }

        const memberData = await memberStatusRepository.addMember({
            team: null,
            project: projectId,
            role: Role.PROJECT_LEAD,
            inviteStatus: InviteStatus.ACCEPTED,
            info: userToAdd.id,
            deletedAt: null,
        });

        if (!memberData) throw new AnErrorOccurredError();
        return memberData;
    };
}
