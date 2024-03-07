import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (!URL) console.log("Database status\t: CANNOT CONNECT: No url");

export function connectDatabase() {
    mongoose
        .connect(URL)
        .then(() => console.log("Database status\t: Connected"))
        .catch((err) => {
            console.log(err);
        });
}
