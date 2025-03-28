import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./route/auth";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);

export default app;
