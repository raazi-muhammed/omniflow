import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IMeeting } from "./entity.interfaces.js";

export type IMeetingUseCases = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    getMeetings: (projectId: string) => Promise<IDBMeeting[]>;
};
