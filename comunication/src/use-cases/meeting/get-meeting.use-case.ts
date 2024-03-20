import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMeetingUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async (meetingId: string) => {
        const meeting = await meetingRepository.getMeeting({ meetingId });
        return meeting;
    };
}
