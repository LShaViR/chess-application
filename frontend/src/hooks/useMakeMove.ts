import { ChessInstance, Move, ShortMove } from "chess.js";
import {
  addMoveToHistory,
  clearActivePiece,
  clearCandidates,
  updateBoard,
} from "../store/features/playGameSlice";
import { useDispatch } from "react-redux";
import { isValidMove } from "../utils/helper";

const useMakeMove = () => {
  const dispatch = useDispatch();

  return (move: ShortMove | Move, chess: ChessInstance, turn: "w" | "b") => {
    console.log("move1");
    if (
      turn == chess.turn() &&
      isValidMove(move, chess.moves({ square: move.from, verbose: true }))
    ) {
      console.log("move6");

      const properMove = chess.move(move); //TODO: change name if possible
      if (properMove) {
        dispatch(updateBoard(chess.board()));
        dispatch(addMoveToHistory(properMove));
      }
      dispatch(clearCandidates());
      dispatch(clearActivePiece());
    } else {
      dispatch(clearCandidates());
      dispatch(clearActivePiece());
    }
  };
};
export default useMakeMove;
