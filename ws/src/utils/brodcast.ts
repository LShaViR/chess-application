import { WebSocket } from "ws";
import { Game } from "../Game";

export const brodcastMessage = (
  sockets: (WebSocket | undefined)[],
  message: string
) => {
  sockets.forEach((socket: WebSocket | undefined) => {
    if (socket) socket.send(message);
  });
};
