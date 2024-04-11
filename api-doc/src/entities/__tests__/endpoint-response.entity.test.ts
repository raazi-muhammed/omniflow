import { describe, expect, it } from "@jest/globals";
import { IEndpointResponse } from "../../interfaces/entity.interface.js";
import Variable from "../variable.entity.js";
import EndpointResponse from "../endpoint-response.entity.js";

describe("endpoint response entity", () => {
    const sampleEndpointResponse: IEndpointResponse = {
        endpointId: "55153a8014829a865bbf700d",
        statusCode: 200,
        type: "string",
    };
    it("should return endpoint response data with only required data", () => {
        const variable = new EndpointResponse(sampleEndpointResponse);
        variable.validate();
        expect(variable.get()).toEqual(sampleEndpointResponse);
    });
    it("should return endpoint response data all data", () => {
        const variableData: IEndpointResponse = {
            ...sampleEndpointResponse,
            description: "get a JSON of user object",
        };

        const variable = new EndpointResponse(variableData);
        variable.validate();
        expect(variable.get()).toEqual(variableData);
    });
    it("should throw and error with status code great than 600", () => {
        const variableData: IEndpointResponse = {
            ...sampleEndpointResponse,
            statusCode: 230230,
        };

        const variable = new EndpointResponse(variableData);
        const validate = () => variable.validate();
        expect(validate).toThrow();
    });
    it("should throw and error with status code less than 100", () => {
        const variableData: IEndpointResponse = {
            ...sampleEndpointResponse,
            statusCode: 10,
        };

        const variable = new EndpointResponse(variableData);
        const validate = () => variable.validate();
        expect(validate).toThrow();
    });
});
