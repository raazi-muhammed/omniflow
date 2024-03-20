import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IMeeting } from "./entity.interfaces.js";

export type IMeetingRepository = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    getMeetings: (data: { projectId: string }) => Promise<IDBMeeting[]>;
    getMeeting: (data: { meetingId: string }) => Promise<IDBMeeting>;
    addMeetingNotes: (data: {
        meetingId: string;
        notes: string;
    }) => Promise<boolean>;
    editMeetingNotes: (data: {
        meetingId: string;
        notes: string;
    }) => Promise<boolean>;
    removeMeetingNotes: (data: { meetingId: string }) => Promise<boolean>;
};
