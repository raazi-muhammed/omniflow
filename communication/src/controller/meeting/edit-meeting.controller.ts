import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMeetingUseCases } from "../../interfaces/use-case.interface.js";

export default function buildEditMeetingController({
    meetingUseCases,
}: {
    meetingUseCases: IMeetingUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const data = req.body;
        const meetingId = req.params.meetingId;
        if (!meetingId) throw new BadRequestError("No meeting id");
        validateBody(data, ["name", "agenda", "startDate"]);

        await meetingUseCases.editMeeting({
            meetingId,
            meetingData: {
                ...data,
                projectId: currentProject.id,
            },
        });

        const response = new ResponseCreator();
        return response.setMessage("Meeting edited");
    };
}
