import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IMeetingController } from "../interfaces/controller.interface.js";

export default function buildMeetingRoutes({
    router,
    verifyUser,
    verifyProject,
    controllers,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    controllers: IMeetingController;
}) {
    /**
     * @openapi
     * /meetings:
     *   get:
     *     summary: Get details of all meetings
     *     tags:
     *       - Meeting
     *     responses:
     *       '200':
     *         description: A array of meeting details
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/meeting'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/meetings",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMeetings)
    );

    /**
     * @openapi
     * /meetings:
     *   post:
     *     summary: Create a new meeting
     *     tags:
     *       - Meeting
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               agenda:
     *                 type: string
     *               notes:
     *                 type: string
     *               startDate:
     *                 type: string
     *               endDate:
     *                 type: string
     *             required:
     *               - name
     *               - agenda
     *               - startDate
     *               - endDate
     *     responses:
     *       '201':
     *         description: Meeting created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/meeting'
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/meetings",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addMeeting)
    );

    /**
     * @openapi
     * /meetings/{meetingId}:
     *   get:
     *     summary: Get details of a single meeting
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON containing meeting details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/meeting'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMeeting)
    );

    /**
     * @openapi
     * /meetings/{meetingId}:
     *   put:
     *     summary: Change a meeting details
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
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
     *               agenda:
     *                 type: string
     *               notes:
     *                 type: string
     *               startDate:
     *                 type: string
     *               endDate:
     *                 type: string
     *             required:
     *               - name
     *               - agenda
     *               - startDate
     *               - endDate
     *     responses:
     *       '204':
     *         description: Meeting updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.editMeeting)
    );

    /**
     * @openapi
     * /meetings/{meetingId}:
     *   delete:
     *     summary: Delete a meeting
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     responses:
     *       '204':
     *         description: Meeting deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMeeting)
    );

    /**
     * @openapi
     * /meetings/{meetingId}/join:
     *   get:
     *     summary: Get details to join the meeting
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     responses:
     *       '204':
     *         description: Meeting Joined
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/meetings/:meetingId/join",
        verifyUser,
        verifyProject,
        makeCallback(controllers.joinMeeting)
    );

    /**
     * @openapi
     * /meetings/{meetingId}/notes:
     *   post:
     *     summary: Create a note on meeting
     *     tags:
     *       - Notes
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               notes:
     *                 type: string
     *             required:
     *               - notes
     *     responses:
     *       '201':
     *         description: Meeting notes created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addMeetingNotes)
    );

    /**
     * @openapi
     * /meetings/{meetingId}/notes:
     *   put:
     *     summary: Change a note on meeting
     *     tags:
     *       - Notes
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     responses:
     *       '201':
     *         description: Meeting notes updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.editMeetingNotes)
    );

    /**
     * @openapi
     * /meetings/{meetingId}/notes:
     *   delete:
     *     summary: Delete a note on meeting
     *     tags:
     *       - Notes
     *     parameters:
     *       - name: meetingId
     *         in: path
     *         required: true
     *         description: id to find the meeting
     *         schema:
     *           type: string
     *     responses:
     *       '204':
     *         description: Meeting notes deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMeetingNotes)
    );

    return router;
}
