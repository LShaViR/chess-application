//// @ts-nocheck
import { useRef } from "react";
import { PiecesProps } from "../utils/types";
import { BLACK } from "../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Piece from "./ui/Piece";
import { findSquare } from "../utils/helper";
import { Square } from "chess.js";
import useMakeMove from "../hooks/useMakeMove";

const Pieces = ({ orientation }: PiecesProps) => {
  const chess = useSelector((state: RootState) => state.game.value?.chess);
  const turn = useSelector((state: RootState) => state.game.value?.turn);
  const ref = useRef<HTMLDivElement>(null);
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const board = playGame?.board;
  const makeMove = useMakeMove();

  if (!chess || !board || !turn) {
    return <></>;
  }

  const onDrop = (e: React.DragEvent) => {
    console.log("onDrop1");
    e.preventDefault();
    const [_piece, fromSquare] = e.dataTransfer.getData("text").split(",");
    const toSquare = findSquare(e, ref.current, turn) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move, chess, turn);
    console.log("onDrop2");
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const fromSquare = playGame?.activePiece;
    if (!fromSquare) {
      return;
    }
    const toSquare = findSquare(e, ref.current, turn) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move, chess, turn);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full aspect-square absolute left-0 top-0 grid grid-cols-8 grid-rows-8"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onClick}
      ref={ref}
    >
      {board.map((row, ri) =>
        row.map((_col, ci) => {
          let rowI = orientation == BLACK ? board.length - ri - 1 : ri;
          let colI = orientation == BLACK ? board.length - ci - 1 : ci;

          if (board[rowI][colI]?.color && board[rowI][colI]?.type) {
            const piece =
              (board[rowI][colI]?.color || "") +
              (board[rowI][colI]?.type || "");
            return (
              <Piece
                key={ri * 8 + ci}
                turn={turn}
                piece={piece}
                square={board[rowI][colI]!.square}
                chess={chess}
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
