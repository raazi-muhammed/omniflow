import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { ITableController } from "../interfaces/controller.interface.js";

export default function buildTableRoutes({
    router,
    verifyUser,
    verifyProject,
    tableController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    tableController: ITableController;
}) {
    router.get(
        "/tables",
        verifyUser,
        verifyProject,
        makeCallback(tableController.getTables)
    );
    router.post(
        "/tables",
        verifyUser,
        verifyProject,
        makeCallback(tableController.addTable)
    );

    return router;
}
