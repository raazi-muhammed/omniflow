import { describe, expect, it, test } from "@jest/globals";
import Project from "../project.entity.js";
import { Types } from "mongoose";

describe("project entity", () => {
    it("should throw error when due date is less than start date", () => {
        const projectData = {
            title: "shop",
            description: "simple project",
            dueDate: new Date(2020, 2),
            isDeleted: false,
            lead: new Types.ObjectId("507f1f77bcf86cd799439011"),
            members: [],
            priority: 1,
            startDate: new Date(),
        };

        const project = new Project(projectData);
        const validate = () => project.validate();

        expect(validate).toThrow(new Error("Invalid due date"));
    });
    it("should throw error when due date and start date are the same", () => {
        const projectData = {
            title: "shop",
            description: "simple project",
            dueDate: new Date(),
            isDeleted: false,
            lead: new Types.ObjectId("507f1f77bcf86cd799439011"),
            members: [],
            priority: 1,
            startDate: new Date(),
        };

        const project = new Project(projectData);
        const validate = () => project.validate();

        expect(validate).toThrow(new Error("Invalid due date"));
    });
    it("should return project data on getter", () => {
        const projectData = {
            title: "shop",
            description: "simple project",
            dueDate: new Date(),
            isDeleted: false,
            lead: new Types.ObjectId("507f1f77bcf86cd799439011"),
            members: [],
            priority: 1,
            startDate: new Date(2020, 2),
        };

        const project = new Project(projectData);
        project.validate();
        const data = project.get();

        expect(data).toEqual(projectData);
    });
});
