import { describe, expect, it } from "@jest/globals";
import { IMeeting } from "../../interfaces/entity.interfaces.js";
import Meeting from "../meeting.entity.js";

describe("meeting entity", () => {
    const sampleMeeting: IMeeting = {
        name: "project date",
        projectId: "55153a8014829a865bbf700d",
        agenda: "to fix project due date",
        startDate: new Date(),
    };
    it("should return meeting data with only required data", () => {
        const meeting = new Meeting(sampleMeeting);
        meeting.validate();
        expect(meeting.get()).toEqual(sampleMeeting);
    });
    it("should return meeting data with all data", () => {
        const meetingData: IMeeting = {
            ...sampleMeeting,
            deletedAt: null,
            endDate: new Date(),
            notes: "sample notes",
            meetingLink: "https://example.com",
        };
        const meeting = new Meeting(meetingData);
        meeting.validate();
        expect(meeting.get()).toEqual(meetingData);
    });
    it("should throw error with same start and end date", () => {
        const meetingData: IMeeting = {
            ...sampleMeeting,
            deletedAt: null,
            endDate: new Date(),
            startDate: new Date(),
        };
        const meeting = new Meeting(meetingData);
        const validate = () => meeting.validate();
        expect(validate).toThrow();
    });
    it("should throw error with when end date is great than start date", () => {
        const meetingData: IMeeting = {
            ...sampleMeeting,
            deletedAt: null,
            endDate: new Date(2020, 1),
            startDate: new Date(),
        };
        const meeting = new Meeting(meetingData);
        const validate = () => meeting.validate();
        expect(validate).toThrow();
    });
});
