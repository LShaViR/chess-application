import { Piece, Square } from "../../types/chess";
import { filesArr, ranks } from "../constant";
import { ShortMoveType } from "../../types/board";

export const findSquare = (
  parentSize: { X: number; Y: number },
  cords: { top: number; left: number; width: number },
  orientation: "w" | "b"
) => {
  if (cords) {
    const size = cords.width / 8;
    const x = Math.floor((parentSize.X - cords.left) / size);
    const y = Math.floor(8 - (parentSize.Y - cords.top) / size);

    if (orientation == "b") {
      return filesArr[7 - x] + ranks[7 - y];
    } else {
      return filesArr[x] + ranks[y];
    }
  } else {
    return null;
  }
};

export const isValidMove = (
  move: ShortMoveType,
  candidates?: ShortMoveType[]
) => {
  // console.log("isValidMove1");
  let ans = false;
  candidates?.forEach((candi) => {
    if (candi.from == move.from && candi.to == move.to) {
      // console.log("isValidMove2");
      ans = true;
      return;
    }
  });
  return ans;
};

export const isPromotion = ({
  from,
  to,
  piece,
}: {
  from: Square;
  to: Square;
  piece: Piece;
}) => {
  if (piece.type != "p") {
    return false;
  } else {
    if (to.endsWith("8") || to.endsWith("1")) {
      return true;
    }
  }
};
