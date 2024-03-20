import { IMeeting } from "../../interfaces/entity.interfaces.js";
import { IMeetingRepository } from "../../interfaces/repository.interface.js";
import { IDBMeeting, IMeetingModel } from "./models/meeting.model.js";

export default function buildMeetingRepository({
    database,
}: {
    database: IMeetingModel;
}): IMeetingRepository {
    return Object.freeze({
        addMeeting: async (meetingData: IMeeting) => {
            return (await database.create(meetingData)) as IDBMeeting;
        },
        getMeetings: async ({ projectId }: { projectId: string }) => {
            return (await database.find({ projectId })) as IDBMeeting[];
        },
        getMeeting: async ({ meetingId }: { meetingId: string }) => {
            return (await database.findOne({ _id: meetingId })) as IDBMeeting;
        },
    });
}
