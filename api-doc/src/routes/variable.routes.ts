import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";
import { verifyEditAccess } from "../lib/access-middlewares.js";

export default function buildVariableRoutes({
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
     * /endpoints/{id}/variables:
     *   post:
     *     summary: Create a new variable
     *     tags:
     *       - Variables
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
     *               name:
     *                 type: string
     *               type:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - name
     *               - type
     *     responses:
     *       '201':
     *         description: Variable added to endpoint
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints/:id/variables",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(endpointController.addEndpointVariable)
    );

    /**
     * @openapi
     * /endpoints/{id}/variables/{variableId}:
     *   delete:
     *     summary: Remove a variable
     *     tags:
     *       - Variables
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *       - name: variableId
     *         in: path
     *         required: true
     *         description: id to find the variable to delete
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Header remove from endpoint
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/endpoints/:id/variables/:variableId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(endpointController.removeEndpointVariable)
    );

    return router;
}
