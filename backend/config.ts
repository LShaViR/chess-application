import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const jwtSecret = "secretkey";

export { port, jwtSecret };
