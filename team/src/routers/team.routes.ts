import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { ITeamController } from "../interfaces/controller.interface.js";

export default function buildTeamRoutes({
    router,
    verifyUser,
    verifyProject,
    controllers,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    controllers: ITeamController;
}) {
    router.post(
        "/add-team",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addTeam)
    );
    return router;
}
