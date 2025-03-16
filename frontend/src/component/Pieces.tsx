//// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { PiecesProps } from "../utils/types";
import { BLACK, WHITE } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Piece from "./ui/Piece";
import {
  clearCandidates,
  promotionUpdate,
} from "../store/features/playGameSlice";
import { findSquare, isValidMove } from "../utils/helper";
import { PieceColor, PieceType, ShortMove, Square } from "chess.js";
const Pieces = ({ turn }: PiecesProps) => {
  const chess = useSelector((state: RootState) => state.game.value?.chess);
  const ref = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState<
    ({ type: PieceType; color: PieceColor; square: Square } | null)[][]
  >(new Array(8).fill(new Array(8).fill(null)));
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const dispatch = useDispatch();

  if (!chess) {
    return <></>;
  }

  useEffect(() => {
    setBoard(chess.board());
  }, []);

  const calculateCordinate = (e: React.DragEvent): number[] => {
    const element = ref.current;
    const cords: { top: number; left: number; width: number } | undefined =
      element?.getBoundingClientRect();

    if (cords) {
      const size = cords.width / 8;
      const x = Math.floor((e.clientX - cords.left) / size);
      const y = Math.floor(8 - (e.clientY - cords.top) / size);
      return [x, y];
    }
    return [];
  };

  const move = (e: React.DragEvent) => {
    console.log("move1");
    const [_piece, fromSquare] = e.dataTransfer.getData("text").split(",");
    const [x, y] = calculateCordinate(e);
    const toSquare = findSquare(x, y, turn);
    console.log("move2");
    if (isValidMove({ from: fromSquare, to: toSquare }, playGame?.candidates)) {
      console.log("move3");
      if (
        chess
          .moves({ verbose: true, square: fromSquare })
          .reduce(
            (promotion, current) =>
              promotion ||
              (current.promotion ? true : false && current.to == toSquare),
            false
          )
      ) {
        console.log("move4");
        dispatch(
          promotionUpdate({
            file: turn == WHITE ? x : 7 - x,
            rank: turn == WHITE ? y : 7 - y,
            from: fromSquare,
            to: toSquare,
          })
        );
        console.log("move5");
        return;
      }
      console.log("move6");
      chess.move({ from: fromSquare, to: toSquare } as ShortMove);
      setBoard(chess.board());
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e: React.DragEvent) => {
    console.log("onDrop1");
    e.preventDefault();
    move(e);
    console.log("onDrop2");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full aspect-square absolute left-0 top-0 grid grid-cols-8 grid-rows-8"
      onDrop={onDrop}
      onDragOver={onDragOver}
      ref={ref}
    >
      {board.map((row, ri) =>
        row.map((_col, ci) => {
          let rowI = ri;
          let colI = ci;
          if (turn == BLACK) {
            rowI = board.length - ri - 1;
            colI = board.length - ci - 1;
          }
          if (board[rowI][colI]?.color && board[rowI][colI]?.type) {
            return (
              <Piece
                key={ri * 8 + ci}
                ri={ri}
                ci={ci}
                turn={turn}
                color={board[rowI][colI]!.color}
                type={board[rowI][colI]!.type}
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
