import { useSelector } from "react-redux";
import Pieces from "./Pieces";
import BoardTiles from "./ui/BoardTiles";
import { RootState } from "../store/store";

const ChessBoard = () => {
  const turn = useSelector((state: RootState) => state.game.value?.turn);
  return (
    <div className="h-full mx-auto relative w-full">
      <BoardTiles orientation={turn || "w"} />
      <Pieces orientation={turn || "w"} />
    </div>
  );
};

export default ChessBoard;
