import { Piece, PieceType } from "chess.js";

const Promotion = ({
  file,
  piece,
  makeMove,
}: {
  file: number;
  piece: Piece; //TODO: change type
  makeMove: (option: Exclude<PieceType, "p" | "k">) => void;
}) => {
  const optionArr = ["q", "n", "r", "b"];

  return (
    <div
      className={`absolute border-4 border-${
        file % 2 == 0 ? "dark" : "light"
      }-tile-highlight z-20 w-[12.5%] aspect-[1/4] grid grid-cols-1 grid-rows-4`}
      style={{ left: `${file * 12.5}%` }}
    >
      {optionArr.map((option, index) => {
        const isBlack = (file + index) % 2 === 1;
        return (
          <div
            key={index}
            className={`relative w-full h-full row-start-${7 + 1} col-start-${
              file + 1
            } ${isBlack ? "bg-dark-tile" : "bg-light-tile"}`}
            onClick={() => {
              makeMove(option as "q" | "n" | "r" | "b");
            }}
          >
            <div
              className={`w-full h-full z-30}`}
              style={{
                backgroundImage: piece
                  ? `url('/assets/${piece.color + piece.type}.png')`
                  : "",
                gridRowStart: index + 1,
                backgroundSize: "100%",
                backgroundPosition: "center",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export { Promotion };
