import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandlingMiddleware, loadEnv, logger } from "@omniflow/common";
import { authRoutes, userRoutes } from "./routers/index.js";
import swaggerDocs from "./lib/swagger.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

const { SERVER_NAME, CORS_ORIGINS, NODE_ENV, PORT } = loadEnv([
    "PORT",
    "SERVER_NAME",
    "CORS_ORIGINS",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "BUCKET_NAME",
    "BUCKET_REGION",
    "AWS_SECRET_KEY",
    "AWS_ACCESS_KEY",
]);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGINS,
        credentials: true,
    })
);

const stream = {
    write: (message: string) => logger.http(message.trim()),
};
app.use(morgan("dev", { stream }));

app.use("/api/user", authRoutes);
app.use("/api/user", userRoutes);

swaggerDocs(app, Number(PORT));

app.use(ErrorHandlingMiddleware);

export default app;
