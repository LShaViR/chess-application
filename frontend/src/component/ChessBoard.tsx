//Remove game state from this page and put it into game page

import Pieces from "./chessboard/Pieces";
import BoardTiles from "./chessboard/BoardTiles";
import { Move, Piece, PieceType, ShortMove, Square } from "chess.js";
import { useState } from "react";
import { isPromotion } from "../utils/helper";
import { Promotion } from "./chessboard/Promotion";
import { filesArr } from "../utils/constant";
import { fenToBoard } from "../utils/chess/fenToBoard";
import { ActivePiece, MoveType } from "../utils/types";

const ChessBoard = ({
  onMove,
  onActive,
  orientation,
  active, //TODO: think if it is required or not
  boardFEN,
  disable,
  candidates,
}: {
  onMove: (move: ShortMove) => void;
  active: ActivePiece;
  onActive: (active: ActivePiece) => void;
  orientation: "w" | "b";
  boardFEN: string; //TODO: check if it is valid fen or not
  disable: boolean;
  candidates: Move[]; //TODO: change move type
}) => {
  const [promotion, setPromotion] = useState<{
    file: number;
    from?: Square | undefined;
    to?: Square | undefined;
    piece?: Piece;
  }>({ file: -1 });

  const board = fenToBoard(boardFEN);

  return (
    <div className="lg:max-h-full lg:h-full aspect-square relative w-xl max-w-full max-h-full">
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
          active={active}
          onActive={onActive}
          makeMove={(move: { from: Square; to: Square; piece: Piece }) => {
            //TODO: make required changes
            //TODO: change shortmove type
            if (isPromotion(move)) {
              //TODO: make active as {square, piece,}
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
