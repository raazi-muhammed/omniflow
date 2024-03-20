import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IMeeting } from "./entity.interfaces.js";

export type IMeetingUseCases = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    getMeetings: (projectId: string) => Promise<IDBMeeting[]>;
    getMeeting: (meetingId: string) => Promise<IDBMeeting>;
    addMeetingNotes: (data: {
        meetingId: string;
        notes: string;
    }) => Promise<void>;
    editMeetingNotes: (data: {
        meetingId: string;
        notes: string;
    }) => Promise<void>;
    removeMeetingNotes: (data: { meetingId: string }) => Promise<void>;
};
