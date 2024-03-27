import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IResponseUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveEndpointResponseController({
    responseUseCases,
}: {
    responseUseCases: IResponseUseCases;
}) {
    return async (req: IRequest) => {
        const responseId = req.params.responseId;
        if (!responseId) throw new BadRequestError();

        await responseUseCases.removeResponse({ id: responseId });

        const response = new ResponseCreator();
        return response.setMessage("Response remove from endpoint");
    };
}
