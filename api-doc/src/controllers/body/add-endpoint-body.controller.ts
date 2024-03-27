import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IBodyUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddEndpointBodyController({
    bodyUseCases,
}: {
    bodyUseCases: IBodyUseCases;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;
        const inputData = req.body;
        validateBody(inputData, ["body"]);

        await bodyUseCases.addBody({
            endpointId,
            body: inputData.body,
        });

        const response = new ResponseCreator();
        return response.setMessage("Body added");
    };
}
