import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IHeaderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildEndpointHeaderController({
    headerUseCases,
}: {
    headerUseCases: IHeaderUseCases;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["key", "value"]);

        const header = await headerUseCases.addHeader({
            key: inputData.key,
            value: inputData.value,
            endpointId,
            description: inputData?.description,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Header added to endpoint")
            .setData(header)
            .setStatusCode(201);
    };
}
