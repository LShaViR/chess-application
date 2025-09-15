import { randomUUID } from "crypto";
import { userJwtClaims } from "./auth";
import { WebSocket } from "ws";
export class User {
  public socket: WebSocket;
  public id: string;
  public gameId: string;
  public name: string;

  constructor(socket: WebSocket, userJwtClaims?: userJwtClaims) {
    this.socket = socket;
    this.id = userJwtClaims?.id || randomUUID();
    this.name = userJwtClaims?.username || `User${Math.floor(Math.random() * 1000)}`;
    this.gameId = "";
  }

  joinGame(gameId: string) {
    this.gameId = gameId;
  }
}
