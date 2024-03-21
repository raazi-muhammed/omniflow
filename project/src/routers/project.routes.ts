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
    /**
     * @openapi
     * /projects:
     *   get:
     *     summary: Get details of all project
     *     responses:
     *       '200':
     *         description: A array of all project
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/project'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/projects",
        verifyUserMiddleware,
        makeCallback(controllers.getProjects)
    );

    /**
     * @openapi
     * /projects:
     *   post:
     *     summary: Create a new project
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *               priority:
     *                 type: number
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Project created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/projects",
        verifyUserMiddleware,
        makeCallback(controllers.addProject)
    );

    /**
     * @openapi
     * /projects/current:
     *   get:
     *     summary: Get details of current project
     *     responses:
     *       '200':
     *         description: A JSON of a project
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/project'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.currentProject)
    );

    /**
     * @openapi
     * /projects:
     *   put:
     *     summary: Updates a project
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *               priority:
     *                 type: number
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '204':
     *         description: Project updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.editProject)
    );

    /**
     * @openapi
     * /projects:
     *   delete:
     *     summary: Deletes a project
     *     responses:
     *       '204':
     *         description: Project deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/projects/current",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.deleteProject)
    );

    /**
     * @openapi
     * /projects:
     *   patch:
     *     summary: Deletes a project
     *     responses:
     *       '204':
     *         description: Project deleted
     *       '500':
     *         description: An error occurred
     */
    router.patch(
        "/projects/current/change-lead",
        verifyUserMiddleware,
        verifyProjectMiddleware,
        makeCallback(controllers.changeProjectLead)
    );

    /**
     * @openapi
     * /projects/{id}:
     *   get:
     *     summary: Get details of current project
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the project
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of a project
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/project'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/projects/:id",
        verifyUserMiddleware,
        makeCallback(controllers.getProject)
    );

    return router;
}
