import express from "express";
const router = express.Router();

router.get("/get-projects", (req, res) => {
    console.log("hooi");
    res.send("hooi");
});

export default router;
