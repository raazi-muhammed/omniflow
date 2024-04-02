import { logger } from "@omniflow/common";
import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (URL) {
    mongoose
        .connect(URL)
        .then(() => logger.info("Database status\t: Connected"))
        .catch((err) => {
            logger.error(err);
        });
} else logger.error("Database status\t: CANNOT CONNECT: No url");
