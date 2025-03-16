import { useDispatch } from "react-redux";
import { ChessInstance, Square } from "chess.js";
import {
  clearCandidates,
  generateCandidates,
  setActivePiece,
} from "../../store/features/playGameSlice";
import { BLACK, filesArr, WHITE } from "../../utils/constant";

const Piece = ({
  turn,
  piece,
  square,
  chess,
}: {
  turn: "w" | "b";
  piece: string;
  square: Square;
  chess: ChessInstance;
}) => {
  const ci =
    turn == WHITE
      ? filesArr.indexOf(square[0])
      : 7 - filesArr.indexOf(square[0]);
  const ri = turn == BLACK ? Number(square[1]) - 1 : 8 - Number(square[1]);

  const dispatch = useDispatch();

  const actPiece = () => {
    if (piece[0] === turn) {
      const candidates = chess.moves({ square, verbose: true });
      dispatch(setActivePiece({ activePiece: square }));
      dispatch(generateCandidates({ candidates }));
      console.log("onDragStart5");
    }
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    actPiece();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${square}`);
    const element = e.target as HTMLElement;
    setTimeout(() => {
      element.style.display = "none";
    }, 0);
    actPiece();
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
      className={`w-full h-full z-10 ${piece ? `cursor-grab` : ""}
      `}
      style={{
        backgroundImage: piece ? `url('/assets/${piece}.png')` : "",
        gridRowStart: ri + 1,
        gridColumnStart: ci + 1,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    ></div>
  );
};

export default Piece;
