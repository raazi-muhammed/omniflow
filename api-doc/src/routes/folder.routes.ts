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
    router.get(
        "/folders/list",
        verifyUser,
        verifyProject,
        makeCallback(folderController.getFolderList)
    );

    router.post(
        "/folders",
        verifyUser,
        verifyProject,
        makeCallback(folderController.addFolder)
    );

    return router;
}
