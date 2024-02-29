import mongoose from "mongoose";
const URL: string | undefined = process.env.DB_URL;

if (URL) {
    mongoose
        .connect(URL)
        .then(() => console.log("User/auth database status\t: Connected"))
        .catch((err) => {
            console.log(err);
        });
} else console.log("User/auth database status\t: CANNOT CONNECT: No url");
