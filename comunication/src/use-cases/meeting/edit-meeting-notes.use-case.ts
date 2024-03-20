import { AnErrorOccurredError } from "@omniflow/common";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildEditMeetingNotesUseCase({
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
        const updated = await meetingRepository.editMeetingNotes({
            meetingId,
            notes,
        });
        if (!updated) throw new AnErrorOccurredError();
    };
}
