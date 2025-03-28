import { useSelector } from "react-redux";
import Pieces from "./Pieces";
import BoardTiles from "./ui/BoardTiles";
import { RootState } from "../store/store";
import {
  Chess,
  ChessInstance,
  Move,
  PieceType,
  ShortMove,
  Square,
} from "chess.js";
import { useEffect, useState } from "react";
import useMakeMove from "../hooks/useMakeMove";
import { BoardType } from "../utils/types";
import { isPromotion } from "../utils/helper";
import { Promotion } from "./Promotion";
import { filesArr } from "../utils/constant";

const ChessBoard = ({ onMove }: { onMove: (move: ShortMove) => void }) => {
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const game = useSelector((state: RootState) => state.game.value);
  const [active, setActive] = useState<Square | "">("");
  const [candidates, setCandidates] = useState<Move[]>([]);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [chess, setChess] = useState<ChessInstance>(new Chess());
  const [board, setBoard] = useState<BoardType>(new Chess().board());
  const [promotion, setPromotion] = useState<{
    file: number;
    from?: Square | undefined;
    to?: Square | undefined;
  }>({ file: -1 });
  const [orientation, setOrientation] = useState<"w" | "b">("w");

  useEffect(() => {
    if (game) {
      setChess(game.chess);
      setTurn(game.turn);
      setOrientation(game.turn);
    }
  }, [game]);
  useEffect(() => {
    if (playGame) {
      setCandidates(playGame.candidates);
      setActive(playGame.activePiece.square);
      setBoard(playGame.board);
    }
  }, [playGame]);

  useEffect(() => {
    if (active) {
      setCandidates(chess.moves({ verbose: true, square: active }));
    }
  }, [active]);

  return (
    <div className="h-full relative w-full">
      {promotion.from ? (
        <Promotion
          file={orientation == "w" ? promotion.file : 7 - promotion.file}
          turn={turn}
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
      <Pieces
        disable={game && playGame ? false : true}
        orientation={orientation}
        active={active}
        setActive={(square) => {
          setActive(square);
        }}
        makeMove={(move: ShortMove) => {
          if (isPromotion(chess, move)) {
            console.log(move);

            setPromotion({
              file: filesArr.indexOf(move.to[0]),
              from: move.from,
              to: move.to,
            });
            setCandidates([]);
            return;
          } else onMove(move);
        }}
        board={board}
      />
    </div>
  );
};

export default ChessBoard;
