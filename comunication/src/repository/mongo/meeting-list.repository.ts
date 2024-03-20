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
            return (await database
                .find({ projectId })
                .sort({ startDate: -1 })) as IDBMeeting[];
        },
        getMeeting: async ({ meetingId }: { meetingId: string }) => {
            return (await database.findOne({ _id: meetingId })) as IDBMeeting;
        },
        addMeetingNotes: async ({
            meetingId,
            notes,
        }: {
            meetingId: string;
            notes: string;
        }) => {
            const response = await database.updateOne(
                { _id: meetingId },
                { notes }
            );
            return response.modifiedCount > 0;
        },
        removeMeetingNotes: async ({ meetingId }: { meetingId: string }) => {
            const response = await database.updateOne(
                { _id: meetingId },
                { notes: null }
            );
            return response.modifiedCount > 0;
        },
        editMeetingNotes: async ({
            meetingId,
            notes,
        }: {
            meetingId: string;
            notes: string;
        }) => {
            const response = await database.updateOne(
                { _id: meetingId },
                { notes }
            );
            return response.modifiedCount > 0;
        },
    });
}
