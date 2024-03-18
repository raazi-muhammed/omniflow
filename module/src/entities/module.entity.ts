import { BadRequestError } from "@omniflow/common";
import { IModule, IModuleEntity } from "../interfaces/entity.interface.js";
import { Types } from "mongoose";

export default class Module implements IModuleEntity {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    dependencies: [string];
    parentModule?: Types.ObjectId;
    deletedAt: Date | null;

    constructor(data: IModule) {
        this.name = data.name;
        this.description = data.description;
        this.projectId = data.projectId;
        this.priority = data.priority;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.dependencies = data.dependencies;
        this.deletedAt = data.deletedAt;
        this.parentModule = data.parentModule;
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
            parentModule: this.parentModule,
        });
    }
}
