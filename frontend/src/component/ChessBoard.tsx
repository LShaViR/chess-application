import { ChessBoardProps } from "../utils/types";
import Pieces from "./Pieces";
import BoardTiles from "./ui/BoardTiles";

const ChessBoard = ({ turn }: ChessBoardProps) => {
  return (
    <div className="h-full mx-auto relative w-full">
      <BoardTiles turn={turn} />
      <Pieces turn={turn} />
    </div>
  );
};

export default ChessBoard;
