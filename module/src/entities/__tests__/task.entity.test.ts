import { describe, expect, it } from "@jest/globals";
import {
    IModule,
    ITask,
    TaskStatus,
} from "../../interfaces/entity.interface.js";
import Module from "../module.entity.js";
import { Types } from "mongoose";
import Task from "../task.entity.js";

describe("task entity", () => {
    const taskData: ITask = {
        dueDate: new Date(),
        startDate: new Date(2020, 1),
        name: "button color",
        priority: 1,
        projectId: "55153a8014829a865bbf700d",
        reporter: new Types.ObjectId("55153a8014829a865bbf700d"),
        status: TaskStatus.COMPLETED,

        description: "change color of login button",
    };
    it("should return module data with valid data", () => {
        const task = new Task(taskData);
        task.validate();
        expect(task.get()).toEqual(taskData);
    });
    it("should throw error when startDate and dueDate is same", () => {
        const data: ITask = {
            ...taskData,
            startDate: new Date(),
            dueDate: new Date(),
        };
        const task = new Task(data);
        const validate = () => task.validate();
        expect(validate).toThrow();
    });
    it("should throw error when startDate is great than dueDate", () => {
        const data: ITask = {
            ...taskData,
            startDate: new Date(),
            dueDate: new Date(),
        };
        const task = new Task(data);
        const validate = () => task.validate();
        expect(validate).toThrow();
    });
});
