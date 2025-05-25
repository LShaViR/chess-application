import { PieceType } from "../../types/chess";
import { BLACK, filesArr, WHITE } from "../../utils/constant";
import { PieceProps } from "../../types/board";

const PieceComponent = ({
  orientation,
  turn,
  piece,
  square,
  onActive,
}: PieceProps) => {
  const ci =
    orientation == WHITE
      ? filesArr.indexOf(square[0])
      : 7 - filesArr.indexOf(square[0]);
  const ri =
    orientation == BLACK ? Number(square[1]) - 1 : 8 - Number(square[1]);

  const actPiece = () => {
    if (piece[0] === turn) {
      onActive({
        square,
        piece: { color: piece[0], type: piece[1] as PieceType },
      });
      // console.log("onDragStart5");
    }
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    actPiece();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log("drag");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${square}`);
    const element = e.target as HTMLElement;
    setTimeout(() => {
      element.style.display = "none";
    }, 0);
    actPiece();
  };
  const onDragEnd = (e: React.DragEvent) => {
    // console.log("onDragEnd1");
    const element = e.target as HTMLDivElement;
    element.style.display = "block";
    // console.log("onDragEnd2");
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
        backgroundRepeat: "no-repeat",
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    ></div>
  );
};

export default PieceComponent;
