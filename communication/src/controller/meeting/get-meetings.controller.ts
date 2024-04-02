import { IRequest, ResponseCreator } from "@omniflow/common";
import { IMeetingUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMeetingsController({
    meetingUseCases,
}: {
    meetingUseCases: IMeetingUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const meetings = await meetingUseCases.getMeetings(currentProject.id);

        const response = new ResponseCreator();
        return response.setData(meetings);
    };
}
