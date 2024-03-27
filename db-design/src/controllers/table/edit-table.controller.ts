import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildEditTableController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const tableData = req.body;
        const tableId = req.params.tableId;
        if (!tableId) throw new BadRequestError("Table id not found");

        validateBody(tableData, ["name"]);

        const table = await tableUseCases.editTable({
            tableId,
            tableData: {
                name: tableData.name,
                description: tableData.description,
            },
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Table edited")
            .setStatusCode(201)
            .setData(table);
    };
}
