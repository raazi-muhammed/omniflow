import "../repository/sql/connect.js";

import swaggerDocs from "./swagger.js";
import app from "../app.js";
import { loadEnv } from "@omniflow/common";
import { metrics } from "./metrics.js";

const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(PORT));
metrics(app, Number(PORT));
