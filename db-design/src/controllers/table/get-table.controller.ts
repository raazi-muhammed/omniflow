import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetTableController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const tableId = req.params.tableId;
        if (!tableId) throw new BadRequestError("Table id not found");

        const table = await tableUseCases.getTable({
            tableId,
        });

        const response = new ResponseCreator();
        return response.setData(table);
    };
}
