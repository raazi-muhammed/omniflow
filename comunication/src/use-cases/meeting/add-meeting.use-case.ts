import { AnErrorOccurredError } from "@omniflow/common";
import { IMeeting } from "../../interfaces/entity.interfaces.js";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildAddMeetingUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async (meetingData: IMeeting) => {
        const meeting = await meetingRepository.addMeeting(meetingData);
        if (!meeting) throw new AnErrorOccurredError();
        return meeting;
    };
}
