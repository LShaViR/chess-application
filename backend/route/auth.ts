import express from "express";
import userSignup from "../controller/auth/signup";
import userLogin from "../controller/auth/login";
import userMe from "../controller/auth/me";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/me", authMiddleware, userMe);

export default router;
