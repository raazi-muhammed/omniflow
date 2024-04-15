import { loadEnv } from "@omniflow/common";
import app from "../app.js";
import "../events/index.js";
import "../repository/mongo/connect.js";
import { metrics } from "./metrics.js";

const { PORT } = loadEnv(["PORT"]);

metrics(app, Number(PORT));
