import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IRelationUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddRelationController({
    relationUseCases,
}: {
    relationUseCases: IRelationUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;
        const relationData = req.body;

        validateBody(relationData, ["to", "from"]);

        if (relationData.to == relationData.from) {
            throw new BadRequestError("Cannot define a relation to itself");
        }

        const relation = await relationUseCases.addRelation({
            projectId: currentProject.id,
            to: relationData.to,
            from: relationData.from,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Relation added")
            .setStatusCode(201)
            .setData(relation);
    };
}
