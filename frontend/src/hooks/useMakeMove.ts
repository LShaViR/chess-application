import { ChessInstance, Move, ShortMove } from "chess.js";
import {
  clearActivePiece,
  clearCandidates,
  promotionUpdate,
  updateBoard,
} from "../store/features/playGameSlice";
import { useDispatch } from "react-redux";
import { isPromotion, isValidMove } from "../utils/helper";
import { filesArr } from "../utils/constant";

const useMakeMove = () => {
  const dispatch = useDispatch();
  return (move: ShortMove | Move, chess: ChessInstance, turn: "w" | "b") => {
    console.log("move1");
    if (
      turn == chess.turn() &&
      isValidMove(move, chess.moves({ square: move.from, verbose: true }))
    ) {
      console.log("move6");

      chess.move(move);
      dispatch(updateBoard(chess.board()));
      dispatch(clearCandidates());
      dispatch(clearActivePiece());
    } else {
      dispatch(clearCandidates());
      dispatch(clearActivePiece());
    }
  };
};
export default useMakeMove;
