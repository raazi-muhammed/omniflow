import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMeetingUseCases } from "../../interfaces/use-case.interface.js";

export default function buildEditMeetingNotesController({
    meetingUseCases,
}: {
    meetingUseCases: IMeetingUseCases;
}) {
    return async (req: IRequest) => {
        const data = req.body;
        const meetingId = req.params.meetingId;
        if (!meetingId) throw new BadRequestError("No meeting id");
        validateBody(data, ["notes"]);

        await meetingUseCases.editMeetingNotes({
            meetingId,
            notes: data.notes,
        });

        const response = new ResponseCreator();
        return response.setMessage("Meeting notes edited");
    };
}
