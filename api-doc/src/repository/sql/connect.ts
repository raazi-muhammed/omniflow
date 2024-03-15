import { logger } from "@omniflow/common";
import { Sequelize } from "sequelize";
const URL: string | undefined = process.env.DB_URL;

if (!URL) throw new Error("Database status\t: CANNOT CONNECT: No url");
export const sequelize = new Sequelize(URL, { logging: false });

try {
    await sequelize.authenticate();
    logger.info("Database status\t: Connected");
} catch (error) {
    logger.error("Database status\t: CANNOT CONNECT:", error);
}
