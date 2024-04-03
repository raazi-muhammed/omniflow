import buildAddMeetingUseCase from "./meeting/add-meeting.use-case.js";
import {
    meetingRepository,
    messageRepository,
} from "../repository/mongo/index.js";
import {
    IMeetingUseCases,
    IMessageUseCases,
} from "../interfaces/use-case.interface.js";
import buildGetMeetingsUseCase from "./meeting/get-meetings.use-case.js";
import buildGetMeetingUseCase from "./meeting/get-meeting.use-case.js";
import buildAddMeetingNotesUseCase from "./meeting/add-meeting-notes.use-case.js";
import buildRemoveMeetingNotesUseCase from "./meeting/remove-meeting-notes.use-case.js";
import buildEditMeetingNotesUseCase from "./meeting/edit-meeting-notes.use-case.js";
import buildRemoveMeetingUseCase from "./meeting/remove-meeting.use-case.js";
import buildEditMeetingUseCase from "./meeting/edit-meeting.use-case.js";
import buildAddMessageUseCase from "./message/add-message.use-case.js";
import buildGetMessagesUseCase from "./message/get-messages.use-case.js";
import { uploadImageToS3 } from "../lib/file-bucket.js";

const addMeeting = buildAddMeetingUseCase({ meetingRepository });
const getMeetings = buildGetMeetingsUseCase({ meetingRepository });
const getMeeting = buildGetMeetingUseCase({ meetingRepository });
const removeMeeting = buildRemoveMeetingUseCase({ meetingRepository });
const editMeeting = buildEditMeetingUseCase({ meetingRepository });

const addMeetingNotes = buildAddMeetingNotesUseCase({ meetingRepository });
const removeMeetingNotes = buildRemoveMeetingNotesUseCase({
    meetingRepository,
});
const editMeetingNotes = buildEditMeetingNotesUseCase({ meetingRepository });

const addMessage = buildAddMessageUseCase({
    messageRepository,
    imageUpload: uploadImageToS3,
});
const getMessages = buildGetMessagesUseCase({ messageRepository });

export const messageUseCases: IMessageUseCases = Object.freeze({
    addMessage,
    getMessages,
});

export const meetingUseCases: IMeetingUseCases = Object.freeze({
    addMeeting,
    getMeetings,
    getMeeting,
    addMeetingNotes,
    removeMeetingNotes,
    editMeetingNotes,
    editMeeting,
    removeMeeting,
});
