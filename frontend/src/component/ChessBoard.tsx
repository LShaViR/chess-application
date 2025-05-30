//Remove game state from this page and put it into game page

import Pieces from "./chessboard/Pieces";
import BoardTiles from "./chessboard/BoardTiles";
import { Piece, PieceType, Square } from "chess.js";
import { isPromotion } from "../utils/chessboard/helper";
import { Promotion } from "./chessboard/Promotion";
import { filesArr } from "../utils/constant";
import { fenToBoard } from "../utils/chess/fenToBoard";
import { ChessBoardProps } from "../types/board";
import { useState } from "react";

const ChessBoard = ({
  onMove,
  onActive,
  orientation,
  turn,
  active, //TODO: think if it is required or not
  boardFEN,
  disable,
  candidates,
  squareSize,
}: ChessBoardProps) => {
  const [promotion, setPromotion] = useState<{
    file: number;
    from?: Square | undefined;
    to?: Square | undefined;
    piece?: Piece;
  }>({ file: -1 });
  const board = fenToBoard(boardFEN);

  return (
    <div
      style={{
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        position: "relative",
      }}
    >
      {promotion.piece ? (
        <Promotion
          file={orientation == "w" ? promotion.file : 7 - promotion.file}
          piece={promotion.piece}
          makeMove={(option: Exclude<PieceType, "p" | "k">) => {
            if (promotion.to && promotion.from) {
              onMove({
                from: promotion.from,
                to: promotion.to,
                promotion: option,
              });
            }
            setPromotion({ file: -1 });
          }}
        />
      ) : (
        <></>
      )}
      <BoardTiles orientation={orientation} candidates={candidates} />
      {board ? (
        <Pieces
          disable={disable}
          orientation={orientation}
          turn={turn}
          active={active}
          onActive={onActive}
          onMovePieces={(move: { from: Square; to: Square; piece: Piece }) => {
            //TODO: make required changes
            if (isPromotion(move)) {
              console.log(move);

              setPromotion({
                file: filesArr.indexOf(move.to[0]),
                from: move.from,
                to: move.to,
                piece: move.piece,
              });
              return;
            } else onMove({ from: move.from, to: move.to });
          }}
          board={board}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChessBoard;
