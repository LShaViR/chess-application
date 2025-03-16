import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ChessInstance, Square } from "chess.js";
import {
  clearCandidates,
  generateCandidates,
} from "../../store/features/playGameSlice";

const Piece = ({
  ri,
  ci,
  turn,
  color,
  type,
  square,
  chess,
}: {
  ri: number;
  ci: number;
  turn: "w" | "b";
  color: string;
  type: string;
  square: Square;
  chess: ChessInstance;
}) => {
  const piece = color + type;
  const dispatch = useDispatch();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("onDragStart1");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${square}`);
    const element = e.target as HTMLElement;
    console.log("onDragStart2");
    setTimeout(() => {
      element.style.display = "none";
    }, 0);
    console.log("onDragStart3", piece);
    if (piece[0] === turn) {
      console.log("onDragStart4");
      const candidates = chess.moves({ square, verbose: true });
      dispatch(generateCandidates({ candidates }));
      console.log("onDragStart5");
    }
  };
  const onDragEnd = (e: React.DragEvent) => {
    console.log("onDragEnd1");
    const element = e.target as HTMLDivElement;
    element.style.display = "block";
    dispatch(clearCandidates());
    console.log("onDragEnd2");
  };
  return (
    <div
      className={`w-full h-full z-10 ${color ? `cursor-grab` : ""}
      `}
      style={{
        backgroundImage: color ? `url('/assets/${color}${type}.png')` : "",
        gridRowStart: ri + 1,
        gridColumnStart: ci + 1,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    ></div>
  );
};

export default Piece;
