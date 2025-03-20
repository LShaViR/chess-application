import { Game } from "./Game";

export class GameManager {
  private games: Map<string, Game>;
  constructor() {
    this.games = new Map<string, Game>();
  }
  addUser(name: string, userId: string, roomId: string, socket: connection) {
    if (!this.games.get(roomId)) {
      this.games.set(roomId, {
        users: [],
      });
    }
    this.games.get(roomId)?.users.push({
      id: userId,
      name,
      conn: socket,
    });
    socket.on("close", (_reasonCode, _description) => {
      this.removeUser(roomId, userId);
    });
  }

  removeUser(roomId: string, userId: string) {
    console.log("removed user");
    const users = this.games.get(roomId)?.users;
    if (users) {
      users.filter(({ id }) => id !== userId);
    }
  }
}
