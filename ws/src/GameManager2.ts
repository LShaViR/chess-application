import { Game } from "./Game";
import {
  IncomingMessage,
  incomingMessageSchema,
  initGamePayloadSchema,
  SupportedIncomingMessage,
} from "./messages/incomingMessages";
import { User } from "./User";

export class GameManager2 {
  private games: Map<string, Game>;
  private users: Map<string, User>;
  private pendingUser: string | null;

  private constructor() {
    this.games = new Map<string, Game>();
    this.users = new Map<string, User>();
    this.pendingUser = null;
  }

  addUser(user: User) {
    this.users.set(user.id, user);
    this.requestHandler(user.id);
  }

  requestHandler(userId: string) {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return;
      }
      const socket = user.socket;

      if (!socket) {
        return;
      }

      socket.on("message", (message: IncomingMessage) => {
        try {
          const messageResult = incomingMessageSchema.safeParse(message);
          if (!messageResult.success) {
            throw new Error("message is of invalid type");
          }
          const { type, payload } = messageResult.data;
          switch (type) {
            case SupportedIncomingMessage.INIT_GAME:
              if (this.pendingUser) {
              } else {
                this.pendingUser = userId;
              }
          }
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
