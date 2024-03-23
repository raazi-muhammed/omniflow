import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IRelationUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveRelationController({
    relationUseCases,
}: {
    relationUseCases: IRelationUseCases;
}) {
    return async (req: IRequest) => {
        const relationId = req.params.relationId;
        if (!relationId) throw new BadRequestError("No relation id");

        await relationUseCases.removeRelation({
            relationId,
        });

        const response = new ResponseCreator();
        return response.setMessage("Relation removed").setStatusCode(204);
    };
}
