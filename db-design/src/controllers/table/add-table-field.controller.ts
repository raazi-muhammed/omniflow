import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddTableFieldController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const tableData = req.body;
        const tableId = req.params.tableId;
        if (!tableId) throw new BadRequestError("Table id not found");

        validateBody(tableData, ["name", "description", "type"]);

        const field = await tableUseCases.addTableField({
            tableId,
            name: tableData.name,
            description: tableData.description,
            type: tableData.type,
        });

        const response = new ResponseCreator();

        return response
            .setMessage("Table field created")
            .setStatusCode(201)
            .setData(field);
    };
}
