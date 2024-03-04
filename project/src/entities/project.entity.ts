import { Types } from "mongoose";
import {
    IProject,
    IProjectEntity,
    InviteStatus,
    Role,
} from "../interfaces/entity.interface.js";

export default class Project implements IProjectEntity {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: Types.ObjectId;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: Types.ObjectId;
    }[];

    constructor(data: IProject) {
        this.title = data.title;
        this.description = data.description;
        this.priority = data.priority;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.projectLead = data.projectLead;
        this.members = data.members;
    }

    validate() {
        if (this.startDate > this.dueDate) throw new Error("Invalid due date");
    }

    get() {
        return Object.freeze({
            title: this.title,
            description: this.description,
            priority: this.priority,
            startDate: this.startDate,
            dueDate: this.dueDate,
            projectLead: this.projectLead,
            members: this.members,
        });
    }
}
