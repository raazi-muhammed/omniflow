import app from "./app.js";
import { loadEnv, logger } from "@omniflow/common";
import "./repository/connect.js";

const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);
app.listen(PORT, () => {
    if (!PORT) {
        logger.info(`PORT NOT FOUND ON ${SERVER_NAME.toUpperCase()}`);
        return;
    }
    logger.info(`Server started (${SERVER_NAME})\t: http://localhost:${PORT}`);
});
