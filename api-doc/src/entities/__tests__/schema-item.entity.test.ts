import { describe, expect, it } from "@jest/globals";
import { ISchemaItem } from "../../interfaces/entity.interface.js";
import SchemaItem from "../schema-item.entity.js";

describe("schema item entity", () => {
    const sampleVariable: ISchemaItem = {
        endpointId: "55153a8014829a865bbf700d",
        key: "name",
        options: [],
        type: "string",
    };
    it("should return schema item data with only required data", () => {
        const variable = new SchemaItem(sampleVariable);
        variable.validate();
        expect(variable.get()).toEqual(sampleVariable);
    });
});
