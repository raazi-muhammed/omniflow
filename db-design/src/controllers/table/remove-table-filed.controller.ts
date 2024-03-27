import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { ITableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveTableFieldController({
    tableUseCases,
}: {
    tableUseCases: ITableUseCases;
}) {
    return async (req: IRequest) => {
        const fieldId = req.params.fieldId;
        if (!fieldId) throw new BadRequestError("Field id not found");

        console.log({ fieldId });

        await tableUseCases.removeTableField({
            id: fieldId,
        });

        const response = new ResponseCreator();
        return response.setMessage("Field removed").setStatusCode(204);
    };
}
