import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveTableController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const tableId = req.params.tableId;
        if (!tableId) throw new BadRequestError("Table id not found");

        await tableUseCases.removeTable({
            tableId,
        });

        const response = new ResponseCreator();
        return response.setMessage("Table removed").setStatusCode(204);
    };
}
