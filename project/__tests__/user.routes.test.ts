import request from "supertest";
import app from "../src/app.js";
import { describe, expect, it, test } from "@jest/globals";

describe("GET /", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/api/project/projects");
        expect(res.body).toEqual({
            message: "Token not found",
            success: false,
        });
    });
});
