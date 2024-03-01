import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { IProjectController } from "../interfaces/controller.interface.js";

export default function buildProjectRoute({
    router,
    verifyUserMiddleware,
    controllers,
}: {
    router: Router;
    verifyUserMiddleware: IVerifyUserMiddleware;
    controllers: IProjectController;
}) {
    router.post(
        "/add-project",
        verifyUserMiddleware,
        makeCallback(controllers.add)
    );

    return router;
}
