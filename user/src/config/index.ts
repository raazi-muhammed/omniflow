import { loadEnv } from "@omniflow/common";
import app from "../app.js";
import "../repository/mongo/connect.js";
import swaggerDocs from "./swagger.js";
import { metrics } from "./metrics.js";

const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(PORT));
metrics(app, Number(PORT));
