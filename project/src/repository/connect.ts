import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (!URL) console.log("User/auth database status\t: CANNOT CONNECT: No url");

export function connectDatabase() {
    mongoose
        .connect(URL)
        .then(() => console.log("User/auth database status\t: Connected"))
        .catch((err) => {
            console.log(err);
        });
}
