import { describe, expect, it } from "@jest/globals";
import { IVariable } from "../../interfaces/entity.interface.js";
import Variable from "../variable.entity.js";

describe("variable entity", () => {
    const sampleVariable: IVariable = {
        name: "user",
        endpointId: "55153a8014829a865bbf700d",
        type: "STRING",
    };
    it("should return variable data with only required data", () => {
        const variable = new Variable(sampleVariable);
        variable.validate();
        expect(variable.get()).toEqual(sampleVariable);
    });
    it("should return variable data all data", () => {
        const variableData: IVariable = {
            ...sampleVariable,
            description: "user name",
        };

        const variable = new Variable(variableData);
        variable.validate();
        expect(variable.get()).toEqual(variableData);
    });
});
