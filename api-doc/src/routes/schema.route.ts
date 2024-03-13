import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildSchemaRoutes({
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
        "/endpoints/:id/schema",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointSchema)
    );
    router.delete(
        "/endpoints/:id/schema/:schemaId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointSchema)
    );

    return router;
}
