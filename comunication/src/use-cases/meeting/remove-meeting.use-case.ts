import { AnErrorOccurredError } from "@omniflow/common";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveMeetingUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async ({ meetingId }: { meetingId: string }) => {
        const meeting = await meetingRepository.removeMeeting({
            meetingId,
        });
        if (!meeting) throw new AnErrorOccurredError();
        return meeting;
    };
}
