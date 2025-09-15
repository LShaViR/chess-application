import { PieceStr, Square } from "../../types/chess";
import { PiecesProps } from "../../types/board";
import { findSquare } from "../../utils/chessboard/helper";
import Piece from "./Piece";
import { BLACK } from "../../utils/constant";

import { useRef } from "react";

const Pieces = ({
  disable,
  orientation,
  turn,
  active,
  onActive,
  board,
  onMovePieces,
}: PiecesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onDrop = (e: React.DragEvent) => {
    // console.log("onDrop1");
    e.preventDefault();

    const fromSquare = active?.square;

    if (!fromSquare || !ref.current || !e) {
      return;
    }

    const cordinates: { top: number; left: number; width: number } =
      ref.current.getBoundingClientRect();
    const parentSize: { X: number; Y: number } = { X: e.clientX, Y: e.clientY };

    const toSquare =
      findSquare(parentSize, cordinates, orientation) || fromSquare;

    const move = {
      from: fromSquare as Square,
      to: toSquare as Square,
      piece: active.piece,
    };

    onMovePieces(move);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const fromSquare = active?.square;
    if (!fromSquare || !ref.current || !e) {
      return;
    }

    const cordinates: { top: number; left: number; width: number } =
      ref.current.getBoundingClientRect();
    const parentSize: { X: number; Y: number } = { X: e.clientX, Y: e.clientY };

    const toSquare =
      findSquare(parentSize, cordinates, orientation) || fromSquare;

    const move = {
      from: fromSquare as Square,
      to: toSquare as Square,
      piece: active.piece,
    };
    onMovePieces(move);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-full w-full absolute left-0 top-0 grid grid-cols-8 grid-rows-8"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onClick}
      ref={ref}
    >
      {board.map((row, ri) =>
        row.map((_col, ci) => {
          const rowI = orientation == BLACK ? board.length - ri - 1 : ri;
          const colI = orientation == BLACK ? board.length - ci - 1 : ci;

          if (board[rowI][colI]?.color && board[rowI][colI]?.type) {
            const piece = ((board[rowI][colI]?.color || "") +
              (board[rowI][colI]?.type || "")) as PieceStr;
            return (
              <Piece
                key={ri * 8 + ci}
                orientation={orientation}
                turn={turn}
                piece={piece}
                square={board[rowI][colI]!.square}
                onActive={!disable ? onActive : () => {}}
              />
            );
          } else {
            return null;
          }
        }),
      )}
    </div>
  );
};
export default Pieces;
