import { Game } from "../Game";
import { User } from "../SocketManager";

function initGame(player: User, pendingUser: User | null, games: Game[]) {
  if (pendingUser) {
    const game = new Game(pendingUser, player);
    games.push();
  }
}

export { initGame };
