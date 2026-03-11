import jwt from "jsonwebtoken";
import { User } from "../User";
import { WebSocket } from "ws";
import { jwtSecret } from "../config";

export interface userJwtClaims {
  id: string;
  name: string;
}
//TODO: update this function
export const extractAuthUser = (
  token: string,
  socket: WebSocket,
): User | undefined => {
  try {
    const decoded = jwt.verify(token, jwtSecret) as userJwtClaims;

    return new User(socket, decoded);
  } catch (error) {
    console.error(error);
  }
};
