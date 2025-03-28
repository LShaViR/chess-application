import { ChessInstance, Square } from "chess.js";
import { filesArr, ranks } from "./constant";
import { MoveType } from "./types";

export const findSquare = (
  e: any,
  element: HTMLDivElement | null,
  orientation: "w" | "b"
) => {
  const cords: { top: number; left: number; width: number } | undefined =
    element?.getBoundingClientRect();

  if (cords) {
    const size = cords.width / 8;
    const x = Math.floor((e.clientX - cords.left) / size);
    const y = Math.floor(8 - (e.clientY - cords.top) / size);

    if (orientation == "b") {
      return filesArr[7 - x] + ranks[7 - y];
    } else {
      return filesArr[x] + ranks[y];
    }
  } else {
    return null;
  }
};

export const isValidMove = (move: MoveType, candidates?: MoveType[]) => {
  console.log("isValidMove1");
  let ans = false;
  candidates?.forEach((candi) => {
    if (candi.from == move.from && candi.to == move.to) {
      console.log("isValidMove2");
      ans = true;
      return;
    }
  });
  return ans;
};

export const isPromotion = (
  chess: ChessInstance,
  { from, to }: { from: Square; to: Square }
) => {
  return chess
    .moves({ verbose: true, square: from })
    .reduce(
      (promotion, current) =>
        promotion || (current.promotion ? true : false && current.to == to),
      false
    );
};
