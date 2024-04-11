import { describe, expect, it } from "@jest/globals";
import { IHeader } from "../../interfaces/entity.interface.js";
import Header from "../header.entity.js";

describe("header entity", () => {
    const sampleHeader: IHeader = {
        endpointId: "55153a8014829a865bbf700d",
        key: "Authorization",
        value: "token",
    };
    it("should return header data with only required data", () => {
        const header = new Header(sampleHeader);
        header.validate();
        expect(header.get()).toEqual(sampleHeader);
    });
    it("should return header data all data", () => {
        const headerData: IHeader = {
            ...sampleHeader,
            description: "user name",
        };

        const header = new Header(headerData);
        header.validate();
        expect(header.get()).toEqual(headerData);
    });
});
