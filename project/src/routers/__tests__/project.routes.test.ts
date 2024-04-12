import request from "supertest";
import app from "../../app.js";
import { describe, expect, it } from "@jest/globals";
import { token } from "@omniflow/common";
import {
    AccessLevels,
    IProject,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import { Types } from "mongoose";
import { IDBMember } from "../../repository/mongo/models/members.model.js";

const userToken = token.sign({
    email: "raazi@gmail.com",
    name: "Raazi Muhammed",
    username: "raazi",
    password: "$2b$10$YT6.uBWSEki3MgvsTIXnJORjrH6R58wr0Lr8oZ/s6TQup8R0QD0ve",
    isVerified: true,
    createdAt: "2024-03-02T16:58:00.670Z",
    updatedAt: "2024-03-29T05:47:12.746Z",
    __v: 0,
    avatar: "https://omniflow-images-resized.s3.eu-north-1.amazonaws.com/7fc04406e6ff09b530257247180cffaad1011db47fa975654569bc5063c8b32a",
    id: "65e35a983bb1ec47c8428478",
    iat: 1712568303,
});
const sampleProjectData: IProject = {
    id: "55153a8014829a865bbf700d",
    title: "shop",
    description: "simple project",
    dueDate: new Date(),
    isDeleted: false,
    lead: new Types.ObjectId("55153a8014829a865bbf700d"),
    members: [
        {
            access: {
                apiDoc: AccessLevels.CAN_EDIT,
                dbDesign: AccessLevels.CAN_EDIT,
                module: AccessLevels.CAN_EDIT,
            },
            info: {
                id: "55153a8014829a865bbf700d",
                email: "raazi@gmail.com",
                name: "raazi",
                username: "raazi",
            } as IDBMember,
            inviteStatus: InviteStatus.ACCEPTED,
            role: Role.TEAM_LEAD,
        },
    ],
    priority: 1,
    startDate: new Date(2020, 1),
};
const projectToken = token.sign(sampleProjectData);

const STATUS_CODE_TOKEN_NOT_FOUND = 404;

describe("project routes", () => {
    describe("GET /projects", () => {
        it("should respond with status 200 and projects with user", async () => {
            const res = await request(app)
                .get("/api/project/projects")
                .set({
                    Authorization: `Bearer ${userToken}`,
                });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBeTruthy();
            expect(res.body.data).toBeInstanceOf(Array);
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
    });
    describe("GET /projects/:id", () => {
        it("should respond with status 200 and project details", async () => {
            const id = "55153a8014829a865bbf700d";
            const res = await request(app)
                .get(`/api/project/projects/${id}`)
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.body.success).toBeTruthy();
            expect(res.body.data.id).toBe(id);
            expect(res.body.data.title).toBeDefined();
            expect(res.body.data.access).toBeDefined();

            console.log("project data", res.body.data);
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
    });
    describe("POST /projects", () => {
        it("should respond with status 200 and project details", async () => {
            const id = "55153a8014829a865bbf700d";
            const res = await request(app)
                .post(`/api/project/projects`)
                .send(sampleProjectData)
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.body.success).toBeTruthy();
            expect(res.body.data.title).toBeDefined();
        });
        it("should respond with status 400 and project details", async () => {
            const id = "55153a8014829a865bbf700d";
            const res = await request(app)
                .post(`/api/project/projects`)
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBeFalsy();
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
    });
    describe("GET /projects/current", () => {
        it("should respond with status 200 and project details", async () => {
            const res = await request(app)
                .get(`/api/project/projects/current`)
                .set({
                    Authorization: `Bearer ${userToken}`,
                    Project: `Bearer ${projectToken}`,
                });

            expect(res.body.success).toBeTruthy();
            expect(res.body.data.id).toBe(sampleProjectData.id);
            expect(res.body.data.title).toBeDefined();
            expect(res.body.data.access).toBeDefined();
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects/current");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app)
                .get("/api/project/projects/current")
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.statusCode).toBe(500);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Not token found");
        });
    });
    describe("DELETE /projects/current", () => {
        it("should respond with status 200 and project details", async () => {
            const res = await request(app)
                .delete(`/api/project/projects/current`)
                .set({
                    Authorization: `Bearer ${userToken}`,
                    Project: `Bearer ${projectToken}`,
                });

            expect(res.statusCode).toBe(204);
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects/current");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app)
                .get("/api/project/projects/current")
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.statusCode).toBe(500);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Not token found");
        });
    });
    describe("PUT /projects/current", () => {
        it("should respond with status 200 and project details", async () => {
            const res = await request(app)
                .put(`/api/project/projects/current`)
                .send(sampleProjectData)
                .set({
                    Authorization: `Bearer ${userToken}`,
                    Project: `Bearer ${projectToken}`,
                });

            expect(res.statusCode).toBe(204);
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app).get("/api/project/projects/current");

            expect(res.statusCode).toBe(STATUS_CODE_TOKEN_NOT_FOUND);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Token not found");
        });
        it(`should respond with ${STATUS_CODE_TOKEN_NOT_FOUND} without token`, async () => {
            const res = await request(app)
                .get("/api/project/projects/current")
                .set({
                    Authorization: `Bearer ${userToken}`,
                });

            expect(res.statusCode).toBe(500);
            expect(res.body.success).toBeFalsy();
            expect(res.body.message).toBe("Not token found");
        });
    });
});
