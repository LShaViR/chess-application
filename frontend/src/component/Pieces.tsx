//// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { PiecesProps } from "../utils/types";
import { BLACK, filesArr } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Piece from "./ui/Piece";
import {
  clearActivePiece,
  clearCandidates,
  promotionUpdate,
} from "../store/features/playGameSlice";
import { findSquare, isPromotion, isValidMove } from "../utils/helper";
import {
  ChessInstance,
  PieceColor,
  PieceType,
  ShortMove,
  Square,
} from "chess.js";

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

  const makeMove = (move: ShortMove, chess: ChessInstance) => {
    console.log("move1");
    if (
      turn == chess.turn() &&
      isValidMove(move, chess.moves({ square: move.from, verbose: true }))
    ) {
      console.log("move3");
      if (isPromotion(chess, move)) {
        console.log("move4");
        dispatch(
          promotionUpdate({
            file: filesArr.indexOf(move.to[0]),
            rank: Number(move.to[1]),
          })
        );
        console.log("move5");
        return;
      }
      console.log("move6");
      chess.move(move);
      setBoard(chess.board());
    }
    dispatch(clearCandidates());
    dispatch(clearActivePiece());
  };

  const onDrop = (e: React.DragEvent) => {
    console.log("onDrop1");
    e.preventDefault();
    const [_piece, fromSquare] = e.dataTransfer.getData("text").split(",");
    const toSquare = findSquare(e, ref.current, turn) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move, chess);
    console.log("onDrop2");
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const fromSquare = playGame?.activePiece;
    if (!fromSquare) {
      return;
    }
    const toSquare = findSquare(e, ref.current, turn) || fromSquare;
    const move = { from: fromSquare as Square, to: toSquare as Square };
    makeMove(move, chess);
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
          let rowI = turn == BLACK ? board.length - ri - 1 : ri;
          let colI = turn == BLACK ? board.length - ci - 1 : ci;

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
