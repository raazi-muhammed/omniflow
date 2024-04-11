import { BadRequestError } from "@omniflow/common";
import { IMeeting, IMeetingEntity } from "../interfaces/entity.interfaces.js";

export default class Meeting implements IMeetingEntity {
    name: string;
    projectId: string;
    agenda: string;
    notes?: string;
    startDate: Date;
    endDate?: Date;
    deletedAt?: Date;
    meetingLink?: string;

    constructor(data: IMeeting) {
        this.name = data.name;
        this.projectId = data.projectId;
        this.agenda = data.agenda;
        this.notes = data.notes;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.deletedAt = data.deletedAt;
        this.meetingLink = data.meetingLink;
    }

    validate() {
        if (this.endDate) {
            if (this.startDate >= this.endDate) {
                throw new BadRequestError("Invalid due date");
            }
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            projectId: this.projectId,
            agenda: this.agenda,
            notes: this.notes,
            startDate: this.startDate,
            endDate: this.endDate,
            deletedAt: this.deletedAt,
            meetingLink: this.meetingLink,
        });
    }
}
