import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IDBMessage } from "../repository/mongo/models/message.model.js";
import { IMeeting, IMessage } from "./entity.interfaces.js";

export type IMeetingRepository = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    editMeeting: (data: {
        meetingId: string;
        meetingData: IMeeting;
    }) => Promise<boolean>;
    removeMeeting: (data: { meetingId: string }) => Promise<boolean>;
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

export type IMessageRepository = {
    addMessage: (data: IMessage) => Promise<IDBMessage>;
    getMessages: (data: { roomId: string }) => Promise<IDBMessage[]>;
};
