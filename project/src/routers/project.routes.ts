import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IProjectController } from "../interfaces/controller.interface.js";

export default function buildProjectRoute({
    router,
    verifyUserMiddleware,
    verifyProjectMiddleware,
    controllers,
}: {
    router: Router;
    verifyUserMiddleware: IVerifyUserMiddleware;
    verifyProjectMiddleware: IVerifyProjectMiddleware;
    controllers: IProjectController;
}) {
    router.post(
        "/projects",
        verifyUserMiddleware,
        makeCallback(controllers.add)
    );
    router.get(
        "/projects",
        verifyUserMiddleware,
        makeCallback(controllers.getAll)
    );
    router.get(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.currentProject)
    );
    router.put(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.edit)
    );
    router.delete(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.deleteProject)
    );
    router.patch(
        "/projects/current/change-lead",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.changeProjectLead)
    );
    router.get(
        "/projects/:id",
        verifyUserMiddleware,
        makeCallback(controllers.getProject)
    );

    return router;
}
