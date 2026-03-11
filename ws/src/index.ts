//TODO: improve file structuring and remove console.log from all files

import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { GameManager } from "./GameManager";
import { User } from "./User";
import { extractAuthUser } from "./auth";
import express, { Request } from "express";

const app = express();
const server = http.createServer(app);

// 1. Initialize WSS WITHOUT the server inside the constructor
const wss = new WebSocketServer({ noServer: true });
const gameManager = new GameManager();

app.get("/", (req, res) => {
  res.send("Server is running");
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function connection(ws: WebSocket, req: Request) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token: string = url.searchParams.get("token") || "";

  const user = extractAuthUser(token, ws);

  ws.on("error", console.error);

  gameManager.addUser(new User(ws, user));
});

//@ts-ignore
const PORT = process.env.PORT || 8080;
server.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
