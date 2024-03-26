import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IFolderController } from "../interfaces/controller.interface.js";

export default function buildFolderRoutes({
    router,
    verifyUser,
    verifyProject,
    folderController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    folderController: IFolderController;
}) {
    router.get(
        "/folders",
        verifyUser,
        verifyProject,
        makeCallback(folderController.getFolders)
    );

    router.post(
        "/folders",
        verifyUser,
        verifyProject,
        makeCallback(folderController.addFolder)
    );

    return router;
}
