import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildSchemaRoutes({
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
     * /endpoints/{id}/schema:
     *   post:
     *     summary: Create a new schema item
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
     *               key:
     *                 type: string
     *               value:
     *                 type: string
     *               options:
     *                 type: string
     *             required:
     *               - key
     *               - value
     *     responses:
     *       '201':
     *         description: Item added to schema
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints/:id/schema",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointSchema)
    );

    /**
     * @openapi
     * /endpoints/{id}/schema/{schemaId}:
     *   delete:
     *     summary: Remove an item from schema
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *       - name: schemaId
     *         in: path
     *         required: true
     *         description: id to find the schema item to delete
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Item removed from schema
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/endpoints/:id/schema/:schemaId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointSchema)
    );

    return router;
}
