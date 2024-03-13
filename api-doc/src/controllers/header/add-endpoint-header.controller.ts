import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { ICreateHeaderUseCase } from "../../interfaces/use-cases.interface.js";

export default function buildEndpointHeaderController({
    endPointsRepository,
    createHeader,
}: {
    endPointsRepository: IEndpointsRepository;
    createHeader: ICreateHeaderUseCase;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["key", "value"]);

        const headerToAdd = createHeader({
            key: inputData.key,
            value: inputData.value,
            endpointId,
            description: inputData?.description,
        });

        const data = await endPointsRepository.addEndpointHeader(headerToAdd);

        const response = new ResponseCreator();
        return response
            .setMessage("Header added to endpoint")
            .setStatusCode(201);
    };
}
