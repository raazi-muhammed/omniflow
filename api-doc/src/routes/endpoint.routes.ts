import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildEndpointRoutes({
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
        "/endpoints",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpoint)
    );
    router.get(
        "/endpoints",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.getEndpoints)
    );

    return router;
}
