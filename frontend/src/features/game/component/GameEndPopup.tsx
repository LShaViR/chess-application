import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { createPortal } from "react-dom";
import { GameStatus } from "../../../types/game";

const GameEndPopup = () => {
  const gameStatus = useSelector(
    (state: RootState) => state.game.value?.gameStatus,
  );

  if (!gameStatus || gameStatus === GameStatus.RUNNING) {
    return null;
  }

  const getStatusContent = () => {
    switch (gameStatus) {
      case GameStatus.WHITE_WINS:
        return { title: "White Wins!", color: "text-slate-100" };
      case GameStatus.BLACK_WINS:
        return { title: "Black Wins!", color: "text-slate-900" };
      case GameStatus.DRAW:
        return { title: "Draw!", color: "text-slate-500" };
      default:
        return { title: "Game Over", color: "text-gray-700" };
    }
  };

  const { title } = getStatusContent();

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-300">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
          {gameStatus === GameStatus.DRAW ? "🤝" : "🏆"}
        </div>

        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <p className="mb-8 text-gray-500">
          {gameStatus === GameStatus.DRAW
            ? "The game ended in a stalemate."
            : `The ${gameStatus.split("_")[0].toLowerCase()} pieces take the victory.`}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700 active:scale-95"
        >
          Play again
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default GameEndPopup;
