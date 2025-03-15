import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { PiecesProps } from "../utils/types";
import { BLACK } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateBoard } from "../store/features/boardSlice";
import Piece from "./ui/Piece";

const Pieces = ({ turn }: PiecesProps) => {
  const [chess, _setChess] = useState(new Chess());
  const board = useSelector((state: RootState) => state.board.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBoard(chess.board()));
  }, []);

  return (
    <div className="w-full aspect-square absolute left-0 top-0 grid grid-cols-8 grid-rows-8">
      {board.map((row, ri) =>
        row.map((col, ci) => {
          let rowI = ri;
          let colI = ci;
          if (turn == BLACK) {
            rowI = board.length - ri - 1;
            colI = board.length - ci - 1;
          }
          if (col?.color && col.type) {
            return (
              <Piece
                key={ri * 8 + ci}
                ri={ri}
                ci={ci}
                turn={turn}
                color={board[rowI][colI]?.color}
                type={board[rowI][colI]?.type}
              />
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
};
export default Pieces;
