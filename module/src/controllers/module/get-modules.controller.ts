import { IRequest, ResponseCreator, logger } from "@omniflow/common";
import { moduleRepository } from "../../repository/mongo/index.js";

export default function buildGetModulesController() {
    return async (req: IRequest) => {
        logger.debug(JSON.stringify(req.body));
        const { currentProject } = req;

        const modules = await moduleRepository.getAll({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(modules);
    };
}
