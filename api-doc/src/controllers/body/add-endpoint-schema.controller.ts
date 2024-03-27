import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IBodyUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddEndpointSchemaController({
    bodyUseCases,
}: {
    bodyUseCases: IBodyUseCases;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        const inputData = req.body;
        validateBody(inputData, ["key", "type", "options"]);

        const schema = bodyUseCases.addSchema({
            key: inputData.key,
            type: inputData.type,
            endpointId,
            options: inputData.options,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Item added to schema")
            .setStatusCode(201)
            .setData(schema);
    };
}
