import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IRelationController } from "../interfaces/controller.interface.js";

export default function buildRelationRoutes({
    router,
    verifyUser,
    verifyProject,
    relationController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    relationController: IRelationController;
}) {
    /**
     * @openapi
     * /relations:
     *   get:
     *     summary: Get details of all relations
     *     responses:
     *       '200':
     *         description: A array containing relation details
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/relation'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/relations",
        verifyUser,
        verifyProject,
        makeCallback(relationController.getRelations)
    );

    /**
     * @openapi
     * /relations:
     *   post:
     *     summary: Create a new relations
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               to:
     *                 type: string
     *               from:
     *                 type: string
     *             required:
     *               - to
     *               - from
     *     responses:
     *       '201':
     *         description: Relation created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/relations",
        verifyUser,
        verifyProject,
        makeCallback(relationController.addRelation)
    );

    /**
     * @openapi
     * /relations/{relationId}:
     *   delete:
     *     summary: Delete a relation
     *     parameters:
     *       - name: relationId
     *         in: path
     *         required: true
     *         description: id to find the relation
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Relation deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/relations/:relationId",
        verifyUser,
        verifyProject,
        makeCallback(relationController.removeRelation)
    );

    return router;
}
