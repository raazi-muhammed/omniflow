import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IModuleController } from "../interfaces/controller.interface.js";

export default function buildModuleRoutes({
    router,
    verifyUser,
    verifyProject,
    moduleController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    moduleController: IModuleController;
}) {
    router.get(
        "/modules",
        verifyUser,
        verifyProject,
        makeCallback(moduleController.getModules)
    );

    router.get(
        "/modules/:moduleId",
        verifyUser,
        verifyProject,
        makeCallback(moduleController.getModule)
    );

    router.get(
        "/modules/list",
        verifyUser,
        verifyProject,
        makeCallback(moduleController.getModuleList)
    );

    router.post(
        "/modules",
        verifyUser,
        verifyProject,
        makeCallback(moduleController.addModule)
    );

    return router;
}
