import { IUser } from "@omniflow/common/dist/interfaces/entity.interface.js";
import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IDBMessage } from "../repository/mongo/models/message.model.js";
import { IMeeting, IMessage } from "./entity.interfaces.js";
import { IFile } from "@omniflow/common";

export type IMeetingUseCases = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    getMeetings: (projectId: string) => Promise<IDBMeeting[]>;
    getMeeting: (meetingId: string) => Promise<IDBMeeting>;
    editMeeting: (data: {
        meetingId: string;
        meetingData: IMeeting;
    }) => Promise<boolean>;
    removeMeeting: (data: { meetingId: string }) => Promise<boolean>;
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

export type IMessageUseCases = {
    addMessage: (data: {
        from: IUser;
        content: string;
        roomId: string;
        imageInput: Express.Multer.File & IFile;
    }) => Promise<IDBMessage>;
    getMessages: (data: { roomId: string }) => Promise<IDBMessage[]>;
};
