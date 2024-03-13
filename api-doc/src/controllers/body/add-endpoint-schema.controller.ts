import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { ICreateSchemaItemUseCase } from "../../interfaces/use-cases.interface.js";

export default function buildAddEndpointSchemaController({
    endPointsRepository,
    createSchemaItem,
}: {
    endPointsRepository: IEndpointsRepository;
    createSchemaItem: ICreateSchemaItemUseCase;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        const inputData = req.body;
        validateBody(inputData, ["key", "type", "options"]);

        const schemaItemToAdd = createSchemaItem({
            key: inputData.key,
            type: inputData.type,
            endpointId,
            options: inputData.options,
        });

        await endPointsRepository.addEndpointSchema(schemaItemToAdd);

        const response = new ResponseCreator();
        return response.setMessage("Item added to schema").setStatusCode(201);
    };
}
