import express from "express";
import userSignup from "../controller/auth/signup";
import userLogin from "../controller/auth/login";

const router =express.Router();

router.post("/signup",userSignup);
router.post("/login", userLogin);


export default router;