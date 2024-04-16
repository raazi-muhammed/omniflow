import app from "./app.js";
import { loadEnv, logger } from "@omniflow/common";
import "./config/index.js";

const { PORT } = loadEnv(["PORT", "SERVER_NAME"]);
app.listen(PORT, () => {
    if (!PORT) console.log("No port");

    logger.info(`Server started\t: http://localhost:${PORT}`);
});
