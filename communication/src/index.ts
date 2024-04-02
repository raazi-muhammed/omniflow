import app from "./app.js";
import { loadEnv, logger } from "@omniflow/common";
import "./config/index.js";

const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);

app.listen(PORT, () => {
    if (!PORT) {
        logger.info(`PORT NOT FOUND ON ${SERVER_NAME.toUpperCase()}`);
        return;
    }
    logger.info(`Server started \t: http://localhost:${PORT}`);
});
