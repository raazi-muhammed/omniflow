import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildHeaderRoutes({
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
        "/endpoints/:id/headers",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointHeader)
    );
    router.delete(
        "/endpoints/:id/headers/:headerId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointHeader)
    );

    return router;
}
