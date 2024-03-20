import { AnErrorOccurredError } from "@omniflow/common";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveMeetingNotesUseCase({
    meetingRepository,
}: {
    meetingRepository: IMeetingRepository;
}) {
    return async ({ meetingId }: { meetingId: string }) => {
        const updated = await meetingRepository.removeMeetingNotes({
            meetingId,
        });
        if (!updated) throw new AnErrorOccurredError();
    };
}
