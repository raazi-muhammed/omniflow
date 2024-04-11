import { describe, expect, it } from "@jest/globals";
import { IModule } from "../../interfaces/entity.interface.js";
import Module from "../module.entity.js";

describe("module entity", () => {
    const moduleData: IModule = {
        name: "Payment integration",
        dependencies: [],
        startDate: new Date(2020, 1),
        description: "add paypal integration",
        dueDate: new Date(),
        priority: 1,
        projectId: "55153a8014829a865bbf700d",
        parentModule: null,
    };
    it("should return module data with valid data", () => {
        const module = new Module(moduleData);
        module.validate();
        expect(module.get()).toEqual(moduleData);
    });
    it("should throw error when startDate and dueDate is same", () => {
        const data: IModule = {
            ...moduleData,
            startDate: new Date(),
            dueDate: new Date(),
        };
        const module = new Module(data);
        const validate = () => module.validate();
        expect(validate).toThrow();
    });
    it("should throw error when startDate is great than dueDate", () => {
        const data: IModule = {
            ...moduleData,
            startDate: new Date(),
            dueDate: new Date(),
        };
        const module = new Module(data);
        const validate = () => module.validate();
        expect(validate).toThrow();
    });
});
