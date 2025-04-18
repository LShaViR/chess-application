//Remove game state from this page and put it into game page

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Piece, ShortMove, Square } from "chess.js";
import { useEffect } from "react";
import ChessBoard from "../../../component/ChessBoard";
import { setActivePiece } from "../../../store/features/playGameSlice";
import { ActivePiece } from "../../../utils/types";
import { defaultBoardFEN } from "../../../utils/constant";

const GameBoard = ({
  onMove,
  orientation, //TODO: may be we can make this global state (game)
}: {
  onMove: (move: ShortMove) => void;
  orientation: "w" | "b";
}) => {
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const dispach = useDispatch();
  // useEffect(() => {
  //   if (game) {
  //     setChess(game.chess);
  //     setTurn(game.turn);
  //     setOrientation(game.turn);
  //   }
  // }, [game]);
  // useEffect(() => {
  //   if (playGame) {
  //     setCandidates(playGame.candidates);
  //     setActive(playGame.activePiece.square);
  //     setBoard(playGame.board);
  //   }
  // }, [playGame]);

  // useEffect(() => {
  //   if (active) {
  //     setCandidates(chess.moves({ verbose: true, square: active })); //TODO: change this to global state (play game state)
  //   }
  // }, [active]);

  return (
    <ChessBoard
      onMove={onMove}
      onActive={(active: ActivePiece) => {
        //TODO: make type for this
        dispach(setActivePiece({ activePiece: active })); //TODO: write this in different place
      }}
      active={playGame?.activePiece || null}
      orientation={orientation}
      boardFEN={playGame?.boardFEN || defaultBoardFEN}
      disable={false}
      candidates={playGame?.candidates || []}
    />
  );
};

export default GameBoard;
