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
    router.get(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        makeCallback(tableController.getTable)
    );
    router.put(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        makeCallback(tableController.editTable)
    );
    router.delete(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        makeCallback(tableController.removeTable)
    );
    router.patch(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        makeCallback(tableController.changeTablePosition)
    );
    router.post(
        "/tables/:tableId/fields",
        verifyUser,
        verifyProject,
        makeCallback(tableController.addTableField)
    );
    router.delete(
        "/tables/:tableId/fields/:fieldId",
        verifyUser,
        verifyProject,
        makeCallback(tableController.removeTableField)
    );

    return router;
}
