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
        "/add-project",
        verifyUserMiddleware,
        makeCallback(controllers.add)
    );
    router.post(
        "/edit-project",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.edit)
    );
    router.delete(
        "/delete-project",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.deleteProject)
    );
    router.get(
        "/get-projects",
        verifyUserMiddleware,
        makeCallback(controllers.getAll)
    );
    router.get(
        "/get-project/:id",
        verifyUserMiddleware,
        makeCallback(controllers.getProject)
    );
    router.get(
        "/current-project",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.currentProject)
    );
    router.post(
        "/change-project-lead",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.changeProjectLead)
    );
    return router;
}
