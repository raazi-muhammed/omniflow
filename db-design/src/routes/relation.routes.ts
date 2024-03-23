import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IRelationController } from "../interfaces/controller.interface.js";

export default function buildRelationRoutes({
    router,
    verifyUser,
    verifyProject,
    relationController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    relationController: IRelationController;
}) {
    router.get(
        "/relations",
        verifyUser,
        verifyProject,
        makeCallback(relationController.getRelations)
    );
    router.post(
        "/relations",
        verifyUser,
        verifyProject,
        makeCallback(relationController.addRelation)
    );
    router.delete(
        "/relations/:relationId",
        verifyUser,
        verifyProject,
        makeCallback(relationController.removeRelation)
    );

    return router;
}
