import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IModuleController } from "../interfaces/controller.interface.js";
import {
    verifyEditAccess,
    verifyViewAccess,
} from "../lib/access-middlewares.js";

export default function buildModuleRoutes({
    router,
    verifyUser,
    verifyProject,
    moduleController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    moduleController: IModuleController;
}) {
    /**
     * @openapi
     * /modules:
     *   get:
     *     summary: Get details of all modules with specified parent
     *     responses:
     *       '200':
     *         description: A array of all modules
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/module'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/modules",
        verifyUser,
        verifyProject,
        verifyViewAccess,
        makeCallback(moduleController.getModules)
    );

    /**
     * @openapi
     * /modules/list:
     *   get:
     *     summary: Get details of all modules
     *     responses:
     *       '200':
     *         description: A array of all modules
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/module'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/modules/list",
        verifyUser,
        verifyProject,
        verifyViewAccess,
        makeCallback(moduleController.getModuleList)
    );

    /**
     * @openapi
     * /modules/{moduleId}:
     *   get:
     *     summary: Get details of all modules
     *     parameters:
     *       - name: moduleId
     *         in: path
     *         required: true
     *         description: id to find the module
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of a module
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/module'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/modules/:moduleId",
        verifyUser,
        verifyProject,
        verifyViewAccess,
        makeCallback(moduleController.getModule)
    );

    /**
     * @openapi
     * /modules:
     *   post:
     *     summary: Create a new module
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Module created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/modules",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(moduleController.addModule)
    );

    /**
     * @openapi
     * /modules:
     *   put:
     *     summary: Updates a module
     *     parameters:
     *       - name: moduleId
     *         in: path
     *         required: true
     *         description: id to find the module
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Module updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/modules/:moduleId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(moduleController.editModule)
    );

    /**
     * @openapi
     * /modules/{moduleId}:
     *   delete:
     *     summary: Deletes the module
     *     parameters:
     *       - name: moduleId
     *         in: path
     *         required: true
     *         description: id to find the module
     *         schema:
     *           type: string
     *     responses:
     *       '204':
     *         description: Module removed
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/modules/:moduleId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(moduleController.deleteModule)
    );

    return router;
}
