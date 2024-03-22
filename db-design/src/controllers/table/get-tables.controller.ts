import { IRequest, ResponseCreator } from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetTablesController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const tables = await tableUseCases.getTables({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();

        return response
            .setMessage("Table created")
            .setStatusCode(201)
            .setData(tables);
    };
}
