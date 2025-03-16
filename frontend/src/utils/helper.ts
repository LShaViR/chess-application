import { filesArr, ranks } from "./constant";
import { MoveType } from "./types";

export const findSquare = (x: number, y: number, turn: "w" | "b") => {
  if (turn == "b") {
    return filesArr[7 - x] + ranks[7 - y];
  } else {
    return filesArr[x] + ranks[y];
  }
};

export const isValidMove = (move: MoveType, candidates?: MoveType[]) => {
  console.log("isValidMove1");
  console.log(move, candidates);
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
