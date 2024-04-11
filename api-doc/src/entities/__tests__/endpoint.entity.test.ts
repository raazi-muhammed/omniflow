import { describe, expect, it } from "@jest/globals";
import { IEndpoint } from "../../interfaces/entity.interface.js";
import Endpoint from "../endpoint.entity.js";

describe("endpoint entity", () => {
    const sampleEndpoint: IEndpoint = {
        method: "GET",
        name: "get users",
        projectId: "55153a8014829a865bbf700d",
        summary: "get list of users",
    };
    it("should return endpoint data with only required data", () => {
        const endpoint = new Endpoint(sampleEndpoint);
        endpoint.validate();
        expect(endpoint.get()).toEqual(sampleEndpoint);
    });
    it("should return endpoint data all data", () => {
        const endpointData: IEndpoint = {
            ...sampleEndpoint,
            body: " get list of users",
            parentFolder: "55153a8014829a865bbf700d",
            route: "get/sdfas",
        };

        const endpoint = new Endpoint(endpointData);
        endpoint.validate();
        expect(endpoint.get()).toEqual(endpointData);
    });
    it("should throw error with invalid project id", () => {
        const endpoint = new Endpoint({ ...sampleEndpoint, projectId: "232" });
        const validate = () => endpoint.validate();
        expect(validate).toThrow();
    });
});
