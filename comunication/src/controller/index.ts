import { IMeetingController } from "../interfaces/controller.interface.js";
import buildAddMeetingController from "./meeting/add-meeting.controller.js";
import { meetingUseCases } from "../use-cases/index.js";
import buildGetMeetingsController from "./meeting/get-meetings.controller.js";
import buildGetMeetingController from "./meeting/get-meeting.controller.js";

const addMeeting = buildAddMeetingController({ meetingUseCases });
const getMeetings = buildGetMeetingsController({ meetingUseCases });
const getMeeting = buildGetMeetingController({ meetingUseCases });

export const meetingController: IMeetingController = Object.freeze({
    addMeeting,
    getMeetings,
    getMeeting,
});
