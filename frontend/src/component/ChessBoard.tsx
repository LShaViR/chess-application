import { useEffect, useState } from "react";
import useStartGame from "../hooks/useStartGame";
import Pieces from "./Pieces";
import BoardTiles from "./ui/BoardTiles";
import { Loader } from "lucide-react";

const ChessBoard = () => {
  const { loading, turn } = useStartGame();
  const [orientation, setOrientation] = useState<"w" | "b">("w");

  useEffect(() => {
    setOrientation(turn || "w");
  }, [turn]);

  if (loading || !turn) {
    return <Loader />;
  }
  return (
    <div className="h-full mx-auto relative w-full">
      <BoardTiles orientation={orientation} />
      <Pieces orientation={orientation} />
    </div>
  );
};

export default ChessBoard;
