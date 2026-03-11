import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = "secretkey";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check for token in cookies or Authorization header
  const token =
    req.cookies.userToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
