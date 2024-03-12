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
        "/endpoints/:id",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.getEndpoint)
    );

    router.get(
        "/endpoints",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.getEndpoints)
    );

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
    router.post(
        "/endpoints/:id/body",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointBody)
    );
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
    router.post(
        "/endpoints/:id/response",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointResponse)
    );

    return router;
}
