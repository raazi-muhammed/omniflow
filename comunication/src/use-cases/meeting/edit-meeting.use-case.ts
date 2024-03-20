import { AnErrorOccurredError } from "@omniflow/common";
import { IMeeting } from "../../interfaces/entity.interfaces.js";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildEditMeetingUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async ({
        meetingId,
        meetingData,
    }: {
        meetingId: string;
        meetingData: IMeeting;
    }) => {
        const meeting = await meetingRepository.editMeeting({
            meetingId,
            meetingData,
        });
        if (!meeting) throw new AnErrorOccurredError();
        return meeting;
    };
}
