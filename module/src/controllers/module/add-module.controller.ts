import { IRequest, ResponseCreator, logger } from "@omniflow/common";

export default function buildAddModuleController() {
    return async (req: IRequest) => {
        logger.debug(JSON.stringify(req.body));

        const response = new ResponseCreator();
        return response.setMessage("Module created");
    };
}
