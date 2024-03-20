import buildMeetingRepository from "./meeting-list.repository.js";
import meetingModel from "./models/meeting.model.js";

export const meetingRepository = buildMeetingRepository({
    database: meetingModel,
});
