import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (URL) {
    mongoose
        .connect(URL)
        .then(() => console.log("Database status\t: Connected"))
        .catch((err) => {
            console.log(err);
        });
} else console.log("Database status\t: CANNOT CONNECT: No url");
