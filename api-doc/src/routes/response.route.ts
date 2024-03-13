import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildResponseRoutes({
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
        "/endpoints/:id/responses",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointResponse)
    );
    router.delete(
        "/endpoints/:id/responses/:responseId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointResponse)
    );

    return router;
}
