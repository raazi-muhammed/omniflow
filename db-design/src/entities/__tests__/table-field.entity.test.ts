import { describe, expect, it } from "@jest/globals";
import { ITableField } from "../../interfaces/entity.interface.js";
import TableField from "../table-field.entity.js";

describe("table entity", () => {
    const sampleTableField: ITableField = {
        description: "user list table",
        name: "User",
        tableId: "55153a8014829a865bbf700d",
        type: "string",
        options: [],
    };
    it("should return table data with valid data", () => {
        const tableField = new TableField(sampleTableField);
        tableField.validate();
        expect(tableField.get()).toEqual(sampleTableField);
    });
});
