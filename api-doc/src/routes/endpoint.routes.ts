import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildEndpointRoutes({
    router,
    verifyUser,
    verifyProject,
    endpointController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    endpointController: IEndpointController;
}) {
    /**
     * @openapi
     * /endpoints:
     *   get:
     *     summary: Get details of all endpoints
     *     tags:
     *       - Endpoint
     *     responses:
     *       '200':
     *         description: A array of all endpoints
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/endpoint'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/endpoints",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.getEndpoints)
    );

    /**
     * @openapi
     * /endpoints:
     *   post:
     *     summary: Create a new endpoint
     *     tags:
     *       - Endpoint
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               route:
     *                 type: string
     *               summary:
     *                 type: string
     *               method:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Endpoint created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpoint)
    );

    /**
     * @openapi
     * /endpoints/{id}:
     *   get:
     *     summary: Get details on one endpoint
     *     tags:
     *       - Endpoint
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of an endpoint
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/endpoint'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/endpoints/:id",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.getEndpoint)
    );

    /**
     * @openapi
     * /endpoints:
     *   put:
     *     summary: Updates an endpoint
     *     tags:
     *       - Endpoint
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               route:
     *                 type: string
     *               summary:
     *                 type: string
     *               method:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Endpoint updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/endpoints/:id",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.editEndpoint)
    );

    /**
     * @openapi
     * /endpoints/{id}:
     *   delete:
     *     summary: Delete an endpoint
     *     tags:
     *       - Endpoint
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Endpoint deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/endpoints/:id",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpoint)
    );

    /**
     * @openapi
     * /endpoints/{id}/body:
     *   post:
     *     summary: Adds body to the endpoint
     *     tags:
     *       - Endpoint
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               body:
     *                 type: string
     *             required:
     *               - body
     *     responses:
     *       '200':
     *         description: Body added to endpoint
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints/:id/body",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointBody)
    );

    return router;
}
