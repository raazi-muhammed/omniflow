import "../repository/mongo/connect.js";
import "../events/kafka/index.js";

import swaggerDocs from "./swagger.js";
import app from "../app.js";
import { loadEnv } from "@omniflow/common";

const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(PORT));
