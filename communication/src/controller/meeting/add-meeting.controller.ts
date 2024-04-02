import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IMeetingUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddMeetingController({
    meetingUseCases,
}: {
    meetingUseCases: IMeetingUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const data = req.body;
        validateBody(data, ["name", "agenda", "startDate"]);

        const meetings = await meetingUseCases.addMeeting({
            ...data,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setMessage("Meeting created").setData(meetings);
    };
}
