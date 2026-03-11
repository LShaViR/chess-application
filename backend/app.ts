//TODO: authenticated /me route have to be build

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./route/auth";
import { FRONTEND_URL } from "./config";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

export default app;
