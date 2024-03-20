import { IMeetingController } from "../interfaces/controller.interface.js";
import buildAddMeetingController from "./meeting/add-meeting.controller.js";
import { meetingUseCases } from "../use-cases/index.js";
import buildGetMeetingsController from "./meeting/get-meetings.controller.js";
import buildGetMeetingController from "./meeting/get-meeting.controller.js";
import buildAddMeetingNotesController from "./meeting/add-meeting-notes.controller.js";
import buildEditMeetingNotesController from "./meeting/edit-meeting-notes.controller.js";
import buildRemoveMeetingNotesController from "./meeting/remove-meetings-notes.controller.js";
import buildRemoveMeetingController from "./meeting/remove-meeting.controller.js";
import buildEditMeetingController from "./meeting/edit-meeting.controller.js";

const addMeeting = buildAddMeetingController({ meetingUseCases });
const getMeetings = buildGetMeetingsController({ meetingUseCases });
const getMeeting = buildGetMeetingController({ meetingUseCases });
const removeMeeting = buildRemoveMeetingController({ meetingUseCases });
const editMeeting = buildEditMeetingController({ meetingUseCases });

const addMeetingNotes = buildAddMeetingNotesController({ meetingUseCases });
const editMeetingNotes = buildEditMeetingNotesController({ meetingUseCases });
const removeMeetingNotes = buildRemoveMeetingNotesController({
    meetingUseCases,
});

export const meetingController: IMeetingController = Object.freeze({
    addMeeting,
    getMeetings,
    getMeeting,
    addMeetingNotes,
    editMeetingNotes,
    removeMeetingNotes,
    removeMeeting,
    editMeeting,
});
