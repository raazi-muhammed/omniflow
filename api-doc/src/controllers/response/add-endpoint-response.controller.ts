import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointResponse } from "../../interfaces/entity.interface.js";
import { IResponseUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddEndpointResponse({
    responseUseCases,
}: {
    responseUseCases: IResponseUseCases;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;
        const inputData = req.body;
        validateBody(inputData, ["statusCode", "type"]);

        const requestToAdd: IEndpointResponse = {
            endpointId,
            statusCode: Number(inputData.statusCode),
            type: inputData.type,
            description: inputData?.description,
            body: inputData?.body,
        };

        const responseDB = await responseUseCases.addResponse(requestToAdd);

        const response = new ResponseCreator();
        return response
            .setMessage("Response added to endpoint")
            .setStatusCode(201)
            .setData(responseDB);
    };
}
