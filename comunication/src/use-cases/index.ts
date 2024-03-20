import buildAddMeetingUseCase from "./meeting/add-meeting.use-case.js";
import { meetingRepository } from "../repository/mongo/index.js";
import { IMeetingUseCases } from "../interfaces/use-case.interface.js";
import buildGetMeetingsUseCase from "./meeting/get-meetings.use-case.js";
import buildGetMeetingUseCase from "./meeting/get-meeting.use-case.js";
import buildAddMeetingNotesUseCase from "./meeting/add-meeting-notes.use-case.js";
import buildRemoveMeetingNotesUseCase from "./meeting/remove-meeting-notes.use-case.js";
import buildEditMeetingNotesUseCase from "./meeting/edit-meeting-notes.use-case.js";
import buildRemoveMeetingUseCase from "./meeting/remove-meeting.use-case.js";
import buildEditMeetingUseCase from "./meeting/edit-meeting.use-case.js";

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
