import app from "./app.js";
import loadEnv from "./lib/loadEnv.js";

const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);
app.listen(PORT, () => {
    if (!PORT) {
        console.log(`PORT NOT FOUND ON ${SERVER_NAME.toUpperCase()}`);
        return;
    }
    console.log(`Server started (${SERVER_NAME})\t: http://localhost:${PORT}`);
});
