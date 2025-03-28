import { randomUUID } from "crypto";
import { Game } from "./Game";
import {
  EXIT_GAME,
  INIT_GAME,
  JOIN_AGAIN,
  JOIN_GAME,
  MOVE,
  OPPONENT_DISCONNECTED,
  OPPONENT_RECONNECTED,
} from "./messages";
import { User } from "./SocketManager";
import { WebSocket } from "ws";
import { messageSchema } from "./zod/schema";
import { brodcastMessage } from "./utils/brodcast";

//TODO: what if server is down logic is pending
export class GameManager {
  private games: Map<string, Game>;
  private users: Map<string, { user: User; gameId: string }>;
  private pendingUserId: string;
  constructor() {
    this.games = new Map<string, Game>();
    this.users = new Map<string, { user: User; gameId: string }>();
    this.pendingUserId = "";
  }

  addUser(user: User) {
    //TODO: make some changes if user is joining game again
    this.users.set(user.id, {
      user,
      gameId: this.users.get(user.id)?.gameId || "",
    });
    this.addHandler(user.id);
  }

  removeUser(userId: string) {
    console.log("removed user");
    this.users.delete(userId);
  }

  addHandler(userId: string) {
    let userI = this.users.get(userId);
    let user = userI?.user;
    if (!user) {
      return;
    } else {
      const socket = user.socket;
      socket.on("message", async (data) => {
        const messageIn = messageSchema.safeParse(JSON.parse(data.toString()));

        if (!messageIn.success) {
          socket.send("You send wrong input");
          return;
        }
        const message = messageIn.data;

        switch (message.type) {
          case INIT_GAME: //TODO: parse or validate type of message
            if (userI?.gameId && this.games.get(userI.gameId)) {
              const game = this.games.get(userI.gameId);
              if (!game) {
                return;
              }
              const player1 = this.users.get(game.player1)!.user!;
              const player2 = this.users.get(game.player2)!.user!;

              const joiningPlayer = user.id == player1.id ? player1 : player2;
              const waitingPlayer = user.id == player2.id ? player1 : player2;
              joiningPlayer.socket.send(
                JSON.stringify({
                  type: JOIN_AGAIN,
                  payload: {
                    player1: {
                      id: player1.id,
                      name: player1.name,
                    },
                    player2: { id: player2.id, name: player2.name },
                    turn: user.id == player1.id ? game?.turn[0] : game?.turn[1],
                  },
                })
              );
              waitingPlayer.socket.send(
                JSON.stringify({
                  type: OPPONENT_RECONNECTED,
                  payload: {
                    player1: {
                      id: player1.id,
                      name: player1.name,
                    },
                    player2: { id: player2.id, name: player2.name },
                    turn: user.id == player1.id ? game?.turn[0] : game?.turn[1],
                  },
                })
              );
              return;
            }
            const pendingUser = this.users.get(this.pendingUserId);
            if (pendingUser) {
              const game = new Game(this.pendingUserId, userId);
              const gameId = randomUUID();
              //TODO: add game to DB
              this.games.set(gameId, game);
              pendingUser.user.joinGame(gameId);
              pendingUser.gameId = gameId;
              user.joinGame(gameId);
              user.gameId = gameId;
              pendingUser.user.socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                  payload: {
                    player1: {
                      id: pendingUser.user.id,
                      name: pendingUser.user.name,
                    },
                    player2: { id: user.id, name: user.name },
                    turn: game.turn[0],
                  },
                })
              );
              user.socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                  payload: {
                    player1: {
                      id: pendingUser.user.id,
                      name: pendingUser.user.name,
                    },
                    player2: { id: user.id, name: user.name },
                    turn: game.turn[1],
                  },
                })
              );
            } else {
              this.pendingUserId = userId;
            }
            break;

          case MOVE: //TODO: parse or validate type of message
            const game = this.games.get(message.payload.gameId); //make a schema for payload for each type

            if (!game) {
              //TODO: find game in database as well
              //game not found
              return;
            } else {
              const move = game.chess.move(message.payload.move);
              if (!move) {
                socket.send("wrong move send");
                return;
              }

              //TODO: add move to queue for DB
              brodcastMessage(
                [
                  this.users.get(game.player1)!.user!.socket,
                  this.users.get(game.player1)!.user!.socket,
                ],
                JSON.stringify({
                  type: MOVE,
                  payload: {
                    ...move,
                  },
                })
              ); //TODO: check for if socket is there or not
            }
            break;
          case EXIT_GAME: //TODO: parse or validate type of message
            break;

          default:
            socket.send("Wrong request type");
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
              otherUser.user.socket.send(
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
