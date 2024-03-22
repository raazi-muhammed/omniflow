import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddTableController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;
        const tableData = req.body;

        validateBody(tableData, ["name"]);

        const table = await tableUseCases.addTable({
            name: tableData.name,
            description: tableData.description,
            projectId: currentProject.id,
            x: 10,
            y: 10,
        });

        const response = new ResponseCreator();

        return response
            .setMessage("Table created")
            .setStatusCode(201)
            .setData(table);
    };
}
