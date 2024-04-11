import { AnErrorOccurredError } from "@omniflow/common";
import {
    IMeeting,
    IMeetingEntityConstructor,
} from "../../interfaces/entity.interfaces.js";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildAddMeetingUseCase({
    meetingRepository,
    Meeting,
}: {
    meetingRepository: IMeetingRepository;
    Meeting: IMeetingEntityConstructor;
}) {
    return async (data: IMeeting) => {
        const meetingEntity = new Meeting(data);
        meetingEntity.validate();
        const meetingData = meetingEntity.get();

        const meeting = await meetingRepository.addMeeting(meetingData);
        if (!meeting) throw new AnErrorOccurredError();
        return meeting;
    };
}
