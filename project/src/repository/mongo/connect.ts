import { logger } from "@omniflow/common";
import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (!URL) logger.error("Database status\t: CANNOT CONNECT: No url");

mongoose
    .connect(URL)
    .then(() => logger.info("Database status\t: Connected"))
    .catch((err) => {
        logger.error(err);
    });
