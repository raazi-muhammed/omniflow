import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IBodyUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveEndpointSchemaController({
    bodyUseCases,
}: {
    bodyUseCases: IBodyUseCases;
}) {
    return async (req: IRequest) => {
        const schemaId = req.params.schemaId;
        if (!schemaId) throw new BadRequestError();

        await bodyUseCases.removeSchema({ schemaId });

        const response = new ResponseCreator();
        return response
            .setMessage("Item removed from schema")
            .setStatusCode(204);
    };
}
