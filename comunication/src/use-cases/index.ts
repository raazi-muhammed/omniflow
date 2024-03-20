import buildAddMeetingUseCase from "./meeting/add-meeting.use-case.js";
import { meetingRepository } from "../repository/mongo/index.js";
import { IMeetingUseCases } from "../interfaces/use-case.interface.js";
import buildGetMeetingsUseCase from "./meeting/get-meetings.use-case.js";
import buildGetMeetingUseCase from "./meeting/get-meeting.use-case.js";

const addMeeting = buildAddMeetingUseCase({ meetingRepository });
const getMeetings = buildGetMeetingsUseCase({ meetingRepository });
const getMeeting = buildGetMeetingUseCase({ meetingRepository });

export const meetingUseCases: IMeetingUseCases = Object.freeze({
    addMeeting,
    getMeetings,
    getMeeting,
});
