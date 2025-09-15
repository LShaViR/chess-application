import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PlayButton } from "../../../component/ui/playButton";
import { INIT_GAME } from "../../../utils/messages";

interface GameEndProps {
  socket: WebSocket | null;
}

const GameEnd: React.FC<GameEndProps> = ({ socket }) => {
  const game = useSelector((state: RootState) => state.game.value);
  
  if (!game?.gameEnd || !socket) {
    return null;
  }

  const getResultText = () => {
    switch (game.gameEnd) {
      case "white_wins":
        return "White Wins!";
      case "black_wins":
        return "Black Wins!";
      case "draw":
        return "Draw";
      default:
        return "Game Over";
    }
  };

  const getResultIcon = () => {
    switch (game.gameEnd) {
      case "white_wins":
        return "👑";
      case "black_wins":
        return "👑";
      case "draw":
        return "🤝";
      default:
        return "🏁";
    }
  };

  const getResultDescription = () => {
    const reason = game.gameEndReason;
    
    if (game.gameEnd === "white_wins" || game.gameEnd === "black_wins") {
      if (reason === "checkmate") {
        return `Checkmate • ${game.gameEnd === "white_wins" ? "White" : "Black"} is victorious`;
      }
      return `${game.gameEnd === "white_wins" ? "White" : "Black"} wins`;
    }
    
    if (game.gameEnd === "draw") {
      switch (reason) {
        case "stalemate":
          return "Stalemate • Game drawn";
        case "repetition":
          return "Threefold repetition • Game drawn";
        case "insufficient_material":
          return "Insufficient material • Game drawn";
        case "50_move_rule":
          return "50-move rule • Game drawn";
        default:
          return "Game drawn";
      }
    }
    
    return "Game finished";
  };

  const handleNewGame = () => {
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-rightsection border-2 border-background rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="text-6xl mb-4">{getResultIcon()}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{getResultText()}</h2>
        <p className="text-gray-300 mb-6">{getResultDescription()}</p>
        
        <div className="space-y-3">
          <PlayButton onClick={handleNewGame}>
            New Game
          </PlayButton>
          <button 
            className="w-full py-2 px-4 bg-transparent border border-gray-500 text-gray-300 rounded hover:bg-gray-700 transition-colors"
            onClick={() => {
              // Could implement analysis mode or other features here
              console.log("Analysis clicked");
            }}
          >
            Analyze Game
          </button>
        </div>
        
        {/* Game stats could be added here */}
        <div className="mt-6 pt-4 border-t border-gray-600 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>{game.player1.username}</span>
            <span>vs</span>
            <span>{game.player2.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;