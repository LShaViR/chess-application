import { WHITE } from "../../utils/constant";

const Piece = ({
  ri,
  ci,
  turn,
  color,
  type,
}: {
  ri: number;
  ci: number;
  turn: "w" | "b";
  color: string;
  type: string;
}) => {
  const rank = turn == WHITE ? ri : 7 - ri;
  const file = turn == WHITE ? ci : 7 - ci;
  const piece = color + type;
  return (
    <div
      className={`w-full h-full ${color ? `cursor-grab` : ""}
      `}
      style={{
        backgroundImage: color ? `url('/assets/${color}${type}.png')` : "",
        gridRowStart: ri + 1,
        gridColumnStart: ci + 1,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Piece;
