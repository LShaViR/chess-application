import { randomUUID } from "crypto";
import { Game } from "./Game";
import {
  INIT_GAME,
  JOIN_AGAIN,
  JOIN_GAME,
  MOVE,
  OPPONENT_DISCONNECTED,
} from "./messages";
import { User } from "./SocketManager";
import { WebSocket } from "ws";

export class GameManager {
  private games: Map<string, Game>;
  private users: Map<string, User>;
  private pendingUserId: string;
  constructor() {
    this.games = new Map<string, Game>();
    this.users = new Map<string, User>();
    this.pendingUserId = "";
  }

  addUser(socket: WebSocket) {
    const user = new User(socket);
    const userId = randomUUID(); //TODO: make some changes if user is joining game again
    this.users.set(userId, user);
    this.addHandler(userId);
  }

  removeUser(userId: string) {
    console.log("removed user");
    this.users.delete(userId);
  }

  addHandler(userId: string) {
    let user = this.users.get(userId);
    let pUserId = userId;
    if (!user) {
      return;
    } else {
      const socket = user.socket;
      socket.on("message", async (data) => {
        const message = JSON.parse(data.toString());
        // console.log(message);
        switch (message.type) {
          case INIT_GAME:
            console.log("init game");
            console.log(message);

            const pendingUser = this.users.get(this.pendingUserId);
            // console.log(pendingUser);

            if (pendingUser) {
              const game = new Game(this.pendingUserId, pUserId);
              const gameId = randomUUID();
              //   console.log(game, gameId);

              //TODO: add game to DB
              this.games.set(gameId, game);
              pendingUser.joinGame(gameId);
              user.joinGame(gameId);
              pendingUser.socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                  payload: {
                    player1: { id: pendingUser.id, name: pendingUser.name },
                    player2: { id: user.id, name: user.name },
                    turn: game.turn[0],
                  },
                })
              );
              user.socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                  payload: {
                    player1: { id: pendingUser.id, name: pendingUser.name },
                    player2: { id: user.id, name: user.name },
                    turn: game.turn[1],
                  },
                })
              );
            } else {
              this.pendingUserId = pUserId;
            }

            break;
          case MOVE:
            const game = this.games.get(message.payload.gameId); //make a schema for payload for each type

            if (!game) {
              //TODO: find game in database as well
              //game not found
            } else {
              game.chess.move(message.payload.move);
              if (game.player1 == pUserId) {
                const player2 = this.users.get(game.player2);
                if (player2) {
                  player2.socket.send(
                    JSON.stringify({
                      type: MOVE,
                      payload: {
                        ...message.payload.move,
                      },
                    })
                  );
                } else {
                  //TODO: handle case for disconnection
                }
              }
            }
            break;
          case JOIN_AGAIN:
            const updateUserId = message.payload.userId;
            const userX = this.users.get(userId);
            if (userX) {
              this.users.set(updateUserId, userX);
              this.users.delete(userId);
              pUserId = updateUserId;
              userX.socket.send(
                JSON.stringify({
                  type: "JOIN_AGAIN",
                  payload: {},
                })
              );
            }
        }
      });
      socket.on("close", () => {
        const userX = this.users.get(userId);
        if (userX) {
          const gameId = userX.gameId;
          const game = this.games.get(gameId);
          if (game) {
            this.removeUser(userId);
            const otherUserId =
              game.player1 == userId ? game.player2 : game.player1;
            const otherUser = this.users.get(otherUserId);
            if (otherUser) {
              otherUser.socket.send(
                JSON.stringify({
                  type: OPPONENT_DISCONNECTED,
                })
              );
            }
          }
        }

        return;
      });
    }
  }
}
