import { loadEnv } from "@omniflow/common";
import "../repository/mongo/connect.js";
import "./socket.js";
import swaggerDocs from "./swagger.js";
import app from "../app.js";

const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(PORT));
