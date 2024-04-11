import { describe, expect, it } from "@jest/globals";
import { ITable } from "../../interfaces/entity.interface.js";
import Table from "../table.entity.js";

describe("table entity", () => {
    const sampleTable: ITable = {
        projectId: "55153a8014829a865bbf700d",
        description: "user list table",
        name: "User",
        x: 12,
        y: 12,
    };
    it("should return table data with valid data", () => {
        const table = new Table(sampleTable);
        table.validate();
        expect(table.get()).toEqual(sampleTable);
    });
});
