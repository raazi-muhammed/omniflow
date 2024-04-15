import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandlingMiddleware, loadEnv, logger } from "@omniflow/common";
import { moduleRoutes, taskRoutes } from "./routes/index.js";
import { metricMiddleware } from "./config/metrics.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

const { CORS_ORIGINS } = loadEnv([
    "PORT",
    "SERVER_NAME",
    "CORS_ORIGINS",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
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

app.use(metricMiddleware());

app.use("/api/module", moduleRoutes);
app.use("/api/module", taskRoutes);

app.use(ErrorHandlingMiddleware);

export default app;
