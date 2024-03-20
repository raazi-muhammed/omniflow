import { IDBMeeting } from "../repository/mongo/models/meeting.model.js";
import { IMeeting } from "./entity.interfaces.js";

export type IMeetingRepository = {
    addMeeting: (data: IMeeting) => Promise<IDBMeeting>;
    getMeetings: (data: { projectId: string }) => Promise<IDBMeeting[]>;
};
