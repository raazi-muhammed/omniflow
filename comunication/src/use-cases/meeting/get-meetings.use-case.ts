import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMeetingsUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async (projectId: string) => {
        const meetings = await meetingRepository.getMeetings({ projectId });
        return meetings;
    };
}
