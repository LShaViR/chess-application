import { Game } from "./Game";
import { INIT_GAME } from "./messages";
import { User } from "./SocketManager";
import { WebSocket } from "ws";

export class GameManager {
  private games: Map<string, Game>;
  private users: User[];
  constructor() {
    this.games = new Map<string, Game>();
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
    this.addHandler(user);
  }

  removeUser(gameId: string, userId: string) {
    console.log("removed user");
    const game = this.games.get(gameId);
    if (!game) {
      console.log("game not found"); //TODO: have to send response to client

      return;
    }
    if (game.player1?.id == userId) {
      game.player1 = null;
    } else if (game.player2?.id == userId) {
      game.player2 = null;
    } else {
      game.viewer.filter(({ id }) => id != userId);
    }
  }
  addHandler(user: User) {
    const socket = user.socket;
    socket.on("message", async (data) => {
      const message = JSON.parse(data.toString());
      console.log(message);
      if (message.type == INIT_GAME) {
        let game = null;
        if (message.payload?.gameId) {
          game = getGame(message.payload.gameId);
        } else {
          game = new Game();
        }
      }
    });
  }
}
