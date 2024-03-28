import { BadRequestError } from "@omniflow/common";
import {
    IMember,
    ITask,
    ITaskEntity,
    TaskStatus,
} from "../interfaces/entity.interface.js";
import { Types } from "mongoose";

export default class Task implements ITaskEntity {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    dependencies: [string];
    module?: Types.ObjectId;
    deletedAt: Date | null;
    status: TaskStatus;
    assignee?: Types.ObjectId | IMember;
    reporter: Types.ObjectId | IMember;

    constructor(data: ITask) {
        this.name = data.name;
        this.description = data.description;
        this.projectId = data.projectId;
        this.priority = data.priority;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.deletedAt = data.deletedAt;
        this.module = data.module;
        this.status = data.status;
        this.reporter = data.reporter;
        this.assignee = data.assignee;
    }

    validate() {
        if (this.startDate > this.dueDate)
            throw new BadRequestError("Invalid due date");
    }

    get() {
        return Object.freeze({
            name: this.name,
            description: this.description,
            projectId: this.projectId,
            priority: this.priority,
            dueDate: this.dueDate,
            startDate: this.startDate,
            dependencies: this.dependencies,
            deletedAt: this.deletedAt,
            module: this.module,
            status: this.status,
            assignee: this.assignee,
            reporter: this.reporter,
        });
    }
}
