import { AxiosRequestConfig } from "axios";
import { Service } from ".";
import { BuildUrl } from "./utils";

export class MeetingService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    getMeetings() {
        this.url = new BuildUrl().communication("/meetings");
        this.axiosGet();
        return this;
    }

    addMeeting(values: {
        name: string;
        agenda: string;
        startDate: Date;
        dueDate?: Date;
    }) {
        this.url = new BuildUrl().communication("/meetings");
        this.axiosPost(values);
        return this;
    }

    editMeeting(
        id: string,
        values: {
            name: string;
            agenda: string;
            startDate: Date;
            dueDate?: Date;
        }
    ) {
        this.url = new BuildUrl().communication(`/meetings/${id}`);
        this.axiosPut(values);
        return this;
    }

    removeMeeting(id: string) {
        this.url = new BuildUrl().communication(`/meetings/${id}`);
        this.axiosDelete();
        return this;
    }

    getMeetingById(id: string) {
        this.url = new BuildUrl().communication(`/meetings/${id}`);
        this.axiosGet();
        return this;
    }

    joinMeeting(id: string) {
        this.url = new BuildUrl().communication(`/meetings/${id}/join`);
        this.axiosGet();
        return this;
    }

    addMeetingNotes(
        id: string,
        values: {
            notes: string;
        }
    ) {
        this.url = new BuildUrl().communication(`/meetings/${id}/notes`);
        this.axiosPost(values);
        return this;
    }

    editMeetingNotes(
        id: string,
        values: {
            notes: string;
        }
    ) {
        this.url = new BuildUrl().communication(`/meetings/${id}/notes`);
        this.axiosPut(values);
        return this;
    }

    deleteMeetingNotes(id: string) {
        this.url = new BuildUrl().communication(`/meetings/${id}/notes`);
        this.axiosDelete();
        return this;
    }
}
