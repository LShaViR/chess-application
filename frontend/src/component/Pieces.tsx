import { useRef } from "react";
import { PiecesProps } from "../utils/types";
import { BLACK } from "../utils/constant";
import Piece from "./ui/Piece";
import { findSquare } from "../utils/helper";
import { Square } from "chess.js";

const Pieces = ({
  disable,
  orientation,
  active,
  setActive,
  board,
  makeMove,
}: PiecesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onDrop = (e: React.DragEvent) => {
    console.log("onDrop1");
    e.preventDefault();
    if (!active) {
      return;
    }
    const fromSquare = active;
    const toSquare = findSquare(e, ref.current, orientation) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move);
    console.log("onDrop2");
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const fromSquare = active;
    if (!fromSquare) {
      return;
    }
    const toSquare = findSquare(e, ref.current, orientation) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-full w-full aspect-square absolute left-0 top-0 grid grid-cols-8 grid-rows-8"
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
                orientation={orientation}
                piece={piece}
                square={board[rowI][colI]!.square}
                setActive={!disable ? setActive : (_square) => {}}
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
