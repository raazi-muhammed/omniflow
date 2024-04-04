import { Types } from "mongoose";
import {
    IAccess,
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
    lead: Types.ObjectId;
    isDeleted: boolean;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: Types.ObjectId;
        access: IAccess;
    }[];

    constructor(data: IProject) {
        this.title = data.title;
        this.description = data.description;
        this.priority = data.priority;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.lead = data.lead;
        this.members = data.members;
        this.isDeleted = data.isDeleted;
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
            isDeleted: this.isDeleted,
            lead: this.lead,
            members: this.members,
        });
    }
}
