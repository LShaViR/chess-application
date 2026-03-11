import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || "secretkey";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export { port, jwtSecret, FRONTEND_URL };
