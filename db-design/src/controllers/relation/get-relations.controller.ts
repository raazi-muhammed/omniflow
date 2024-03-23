import { IRequest, ResponseCreator } from "@omniflow/common";
import { IRelationUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetRelationsController({
    relationUseCases,
}: {
    relationUseCases: IRelationUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const relation = await relationUseCases.getRelations({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Relation added")
            .setStatusCode(201)
            .setData(relation);
    };
}
