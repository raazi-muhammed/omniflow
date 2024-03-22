import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildChangeTablePositionController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const tableId = req.params.tableId;
        if (!tableId) throw new BadRequestError("Table id not found");

        const position = req.body;
        validateBody(position, ["x", "y"]);

        const table = await tableUseCases.changeTablePosition({
            tableId,
            x: position.x,
            y: position.y,
        });

        const response = new ResponseCreator();
        return response.setMessage("Table position changed").setStatusCode(204);
    };
}
