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
    /**
     * @openapi
     * /folders:
     *   get:
     *     summary: Get details of all folders with parent folder
     *     tags:
     *       - Folder
     *     parameters:
     *       - in: query
     *         name: parentFolder
     *         schema:
     *           type: string
     *         description: Id of the parent folder
     *     responses:
     *       '200':
     *         description: A array of folder details
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/folder'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/folders",
        verifyUser,
        verifyProject,
        makeCallback(folderController.getFolders)
    );

    /**
     * @openapi
     * /folders/list:
     *   get:
     *     summary: Get details of all folders
     *     tags:
     *       - Folder
     *     responses:
     *       '200':
     *         description: A array of folder details
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/folder'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/folders/list",
        verifyUser,
        verifyProject,
        makeCallback(folderController.getFolderList)
    );

    /**
     * @openapi
     * /folders:
     *   post:
     *     summary: Create a new folder
     *     tags:
     *       - Folder
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               parentFolder:
     *                 type: string
     *             required:
     *               - name
     *     responses:
     *       '201':
     *         description: Folder created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/folders",
        verifyUser,
        verifyProject,
        makeCallback(folderController.addFolder)
    );

    return router;
}
