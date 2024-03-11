import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildAddEndpointBodyController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;
        const inputData = req.body;
        validateBody(inputData, ["body"]);

        await endPointsRepository.addEndpointBody({
            endpointId,
            body: inputData.body,
        });

        const response = new ResponseCreator();
        return response.setMessage("Body added");
    };
}
