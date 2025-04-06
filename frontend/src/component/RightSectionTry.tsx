import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { Chess, Move } from "chess.js";

interface RightSectionProps {
  moves: Move[];
}

const RightSectionTry: React.FC<RightSectionProps> = ({ moves }) => {
  const renderMoves = (moves: Move[]) => {
    const moveTableRow = [];
    for (let i = 1; i < moves.length; i += 2) {
      moveTableRow.push(
        <tr className={`${i % 4 == 1 ? "bg-navbar" : "bg-background"}`}>
          <td className="pl-4 pr-2 text-gray-500 w-10">{(i + 1) / 2}.</td>
          <td className="px-2">{moves[i - 1].san}</td>
          <td className="px-2">{moves[i].san}</td>
          {/* <td className="px-2 text-right text-gray-400 whitespace-nowrap">
            {move.whiteTime && <div>{move.whiteTime}</div>}
            {move.blackTime && <div>{move.blackTime}</div>}
          </td> */}
        </tr>
      );
    }
    if (moves.length % 2 == 1) {
      moveTableRow.push(
        <tr
          className={`${moves.length % 4 == 1 ? "bg-navbar" : "bg-background"}`}
        >
          <td className="pl-4 pr-2 text-gray-500 w-10">
            {(moves.length + 1) / 2}.
          </td>
          <td className="px-2">{moves[moves.length - 1].san}</td>
          <td className="px-2"></td>
          {/* <td className="px-2 text-right text-gray-400 whitespace-nowrap">
            {move.whiteTime && <div>{move.whiteTime}</div>}
            {move.blackTime && <div>{move.blackTime}</div>}
          </td> */}
        </tr>
      );
    }
    return moveTableRow;
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-rightsection border-y-2 border-background text-gray-200">
      {/* Header Navigation */}
      <div className="flex justify-center gap-5 p-4 border-b border-gray-700">
        <button className="flex flex-col items-center text-xs">
          <FaPlay className="text-lg mb-1" />
          <span>Play</span>
        </button>
        <button className="flex flex-col items-center text-xs">
          <FaPlus className="text-lg mb-1" />
          <span>New Game</span>
        </button>
      </div>
      {/* Moves List */}
      <div className=" overflow-y-auto px-4 h-96">
        <table className="w-full text-xs ">
          <tbody>{renderMoves(moves)}</tbody>
        </table>
      </div>

      {/* Game Controls */}
      <div className="flex justify-start items-center border-t border-gray-700 px-4 py-2">
        <button className="text-gray-400 px-2 flex items-center gap-1">
          <span>½</span>
          <span>Draw</span>
        </button>
        <button className="text-gray-400 px-2 flex items-center gap-1">
          <span>🏳️</span>
          <span>Resign</span>
        </button>
      </div>
    </div>
  );
};

export default RightSectionTry;

// Usage example:
const App = () => {
  const chess = new Chess();
  chess.load_pgn(
    "1. e4 c5 2. Nf3 a6 3. d3 g6 4. g3 Bg7 5. Bg2 b5 6. O-O Bb7 7. c3 e5 8. a3 Ne7 9. b4 d6 10. Nbd2 O-O 11. Nb3 Nd7 12. Be3 Rc8 13. Rc1 h6 14. Nfd2 f5 15. f4 Kh7 16. Qe2 cxb4 17. axb4 exf4 18. Bxf4 Rxc3 19. Rxc3 Bxc3 20. Bxd6 Qb6+ 21. Bc5 Nxc5 22. bxc5 Qe6 23. d4 Rd8 24. Qd3 Bxd2 25. Nxd2 fxe4 26. Nxe4 Nf5 27. d5 Qe5 28. g4 Ne7 29. Rf7+ Kg8 30. Qf1 Nxd5 31. Rxb7 Qd4+ 32. Kh1 Rf8 33. Qg1 Ne3 34. Re7 a5 35. c6 a4 36. Qxe3 Qxe3 37. Nf6+ Rxf6 38. Rxe3 Rd6 39. h4 Rd1+ 40. Kh2 b4 41. c7 1-0"
  );
  const gameMoves: Move[] = [...chess.history({ verbose: true })];

  return <RightSectionTry moves={gameMoves} />;
};

export { App };
