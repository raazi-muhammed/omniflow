import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildVariableRoutes({
    router,
    verifyUser,
    verifyProject,
    endpointController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    endpointController: IEndpointController;
}) {
    router.post(
        "/endpoints/:id/variables",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointVariable)
    );
    router.delete(
        "/endpoints/:id/variables/:variableId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointVariable)
    );

    return router;
}
