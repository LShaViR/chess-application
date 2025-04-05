import React, { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BiSmile } from "react-icons/bi";

interface ChessMove {
  number: number;
  white: string;
  black: string;
  whiteTime?: string;
  blackTime?: string;
}
interface ChessGameProps {
  moves: ChessMove[];
}

const RightSectionTry: React.FC<ChessGameProps> = ({ moves }) => {
  const [message, setMessage] = useState("");

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
          <tbody>
            {moves.map((move, index) => (
              <tr
                key={move.number}
                className={`${index % 2 == 0 ? "bg-navbar" : "bg-background"}`}
              >
                <td className="pl-4 pr-2 text-gray-500 w-10">{move.number}.</td>
                <td className="px-2">{move.white}</td>
                <td className="px-2">{move.black}</td>
                <td className="px-2 text-right text-gray-400 whitespace-nowrap">
                  {move.whiteTime && <div>{move.whiteTime}</div>}
                  {move.blackTime && <div>{move.blackTime}</div>}
                </td>
              </tr>
            ))}
          </tbody>
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
      {/* Message Input */}
      <div className="flex-grow flex flex-col justify-between h-auto ">
        <div className="flex-grow h-auto">messages</div>
        <div className="flex items-center p-2  border-gray-700">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-grow bg-gray-800 text-gray-200 rounded p-2 text-sm focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="ml-2 text-gray-400">
            <BiSmile size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSectionTry;

// Usage example:
const App = () => {
  const gameMoves: ChessMove[] = [
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
    { number: 1, white: "e4", black: "e5", blackTime: "12", whiteTime: "2" },
  ];

  return <RightSectionTry moves={gameMoves} />;
};

export { App };
