import { describe, expect, it } from "@jest/globals";
import { IRelation } from "../../interfaces/entity.interface.js";
import Relation from "../relation.entity.js";

describe("relation entity", () => {
    const sampleRelation: IRelation = {
        projectId: "55153a8014829a865bbf700d",
        from: "55153a8014829a865bbf700d",
        to: "55153a8014829a865bbf700d",
    };
    it("should return relation data with valid data", () => {
        const relation = new Relation(sampleRelation);
        relation.validate();
        expect(relation.get()).toEqual(sampleRelation);
    });
});
