import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMeetingUseCases } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMeetingController({
    meetingUseCases,
}: {
    meetingUseCases: IMeetingUseCases;
}) {
    return async (req: IRequest) => {
        const meetingId = req.params.meetingId;
        if (!meetingId) throw new BadRequestError("No meeting id");

        await meetingUseCases.removeMeeting({
            meetingId,
        });

        const response = new ResponseCreator();
        return response.setMessage("Meeting deleted");
    };
}
