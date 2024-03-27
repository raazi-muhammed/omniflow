import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IHeaderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveEndpointHeaderController({
    headerUseCases,
}: {
    headerUseCases: IHeaderUseCases;
}) {
    return async (req: IRequest) => {
        const headerId = req.params.headerId;
        if (!headerId) throw new BadRequestError();

        await headerUseCases.removeHeader({ id: headerId });

        const response = new ResponseCreator();
        return response.setMessage("Header remove from endpoint");
    };
}
