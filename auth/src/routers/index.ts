import express from "express";
import makeCallback from "../lib/express-callback.js";
import authControllers from "../controllers/index.js";

const router = express.Router();

router.post("/sign-up", makeCallback(authControllers.signIn));
router.post("/login", makeCallback(authControllers.login));
router.get("/current-user", makeCallback(authControllers.currentUser));

export default router;
