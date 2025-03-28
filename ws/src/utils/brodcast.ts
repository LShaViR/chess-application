import { WebSocket } from "ws";
import { Game } from "../Game";

export const brodcastMessage = (sockets: WebSocket[], message: string) => {
  sockets.forEach((socket) => {
    socket.send(message);
  });
};
