import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { ITeamController } from "../interfaces/controller.interface.js";

export default function buildTeamRoutes({
    router,
    verifyUserMiddleware,
    controllers,
}: {
    router: Router;
    verifyUserMiddleware: IVerifyUserMiddleware;
    controllers: ITeamController;
}) {
    router.post(
        "/add-team",
        verifyUserMiddleware,
        makeCallback(controllers.addTeam)
    );
    return router;
}
