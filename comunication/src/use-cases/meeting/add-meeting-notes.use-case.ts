import { AnErrorOccurredError } from "@omniflow/common";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildAddMeetingNotesUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async ({
        meetingId,
        notes,
    }: {
        meetingId: string;
        notes: string;
    }) => {
        const updated = await meetingRepository.addMeetingNotes({
            meetingId,
            notes,
        });
        if (!updated) throw new AnErrorOccurredError();
    };
}
