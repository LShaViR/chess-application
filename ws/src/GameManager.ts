import { randomUUID } from "crypto";
import { Game } from "./Game";
import {
  EXIT_GAME,
  GAME_OVER,
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
import { BLACK_WINS, DRAW, WHITE_WINS } from "./utils/constant";

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

  removeGame(gameId: string) {
    this.games.delete(gameId);
  }

  addHandler(userId: string) {
    let userI = this.users.get(userId);
    let user = userI?.user;
    if (!user) {
      return;
    } else {
      const socket = user.socket;
      socket.on("message", async (data) => {
        try {
          const obj = JSON.parse(data.toString());
          const messageIn = messageSchema.safeParse(obj);
          console.log(messageIn);
          if (!messageIn.success) {
            socket.send("You send wrong input type");
            return;
          }
          const message = messageIn.data;
          console.log(message);

          switch (message.type) {
            case INIT_GAME: //TODO: parse or validate type of message
              console.log(
                userI,
                userI?.gameId ? this.users.get(userI.gameId) : false
              );

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
                      turn:
                        user.id == player1.id ? game?.turn[0] : game?.turn[1],
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
                      turn:
                        user.id == player1.id ? game?.turn[0] : game?.turn[1],
                    },
                  })
                );
                return;
              }
              console.log("india2");

              const pendingUser = this.users.get(this.pendingUserId);
              console.log("india3");
              if (pendingUser) {
                console.log("india4");
                const game = new Game(this.pendingUserId, userId);
                const gameId = randomUUID();
                //TODO: add game to DB
                this.games.set(gameId, game);
                pendingUser.user.joinGame(gameId);
                pendingUser.gameId = gameId;
                user.joinGame(gameId);
                user.gameId = gameId;
                console.log("india5");
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
                this.pendingUserId = "";
              } else {
                console.log("india6");
                this.pendingUserId = userId;
                socket.send(
                  JSON.stringify({
                    type: "pendinguser",
                    payload: {
                      message: "pending use set",
                    },
                  })
                );
              }
              break;

            case MOVE: //TODO: parse or validate type of message
              console.log("move");

              const game = this.games.get(user.gameId); //make a schema for payload for each type
              console.log("move2");
              if (!game) {
                //TODO: find game in database as well
                //game not found
                return;
              } else {
                const move = game.chess.move(message.payload.move);
                console.log(move);

                if (!move) {
                  socket.send("wrong move send");
                  return;
                }

                //TODO: add move to queue for DB
                brodcastMessage(
                  [
                    this.users.get(game.player1)!.user!.socket,
                    this.users.get(game.player2)!.user!.socket,
                  ],
                  JSON.stringify({
                    type: MOVE,
                    payload: {
                      move,
                      turn: game.chess.turn() == "w" ? "b" : "w",
                    },
                  })
                ); //TODO: check for if socket is there or not
                if (game.chess.isGameOver()) {
                  //TODO: make different message for different types of draw and wins
                  const result = game.chess.isCheckmate()
                    ? game.chess.turn() == "b"
                      ? WHITE_WINS
                      : BLACK_WINS
                    : DRAW;
                  brodcastMessage(
                    [
                      this.users.get(game.player1)?.user.socket,
                      this.users.get(game.player2)?.user.socket,
                    ],
                    JSON.stringify({
                      type: GAME_OVER,
                      payload: {
                        result: result,
                      },
                    })
                  );
                }
              }
              break;
            case EXIT_GAME: //TODO: parse or validate type of message
              break;

            default:
              socket.send("Wrong request type");
          }
        } catch (error) {
          console.error(error);
          socket.send("wrong message sent");
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
