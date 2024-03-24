import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";

export default function buildJoinMeetingController() {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        const meetingId = req.params.meetingId;
        if (!meetingId) throw new BadRequestError("No meeting id");

        const response = new ResponseCreator();
        return response.setData({ user: currentUser });
    };
}
