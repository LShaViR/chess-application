import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { GameManager } from "./GameManager";
import { User } from "./User";
import url from "url";
import { extractAuthUser } from "./auth";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});

const wss = new WebSocketServer({ server });
const gameManager = new GameManager();

wss.on("connection", function connection(ws: WebSocket, req: Request) {
  const token: string = req.url.split("token=")[1];

  const user = extractAuthUser(token, ws);

  ws.on("error", console.error);

  gameManager.addUser(new User(ws, user));
});

server.listen(process.env.PORT || 8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
