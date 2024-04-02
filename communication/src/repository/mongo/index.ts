import buildMeetingRepository from "./meeting-list.repository.js";
import buildMessageRepository from "./message-list.repository.js";
import meetingModel from "./models/meeting.model.js";
import messageModel from "./models/message.model.js";

export const meetingRepository = buildMeetingRepository({
    database: meetingModel,
});

export const messageRepository = buildMessageRepository({
    database: messageModel,
});
