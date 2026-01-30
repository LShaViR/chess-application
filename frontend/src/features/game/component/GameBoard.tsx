//Remove game state from this page and put it into game page

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import ChessBoard from "../../../component/ChessBoard";
import {
  generateCandidates,
  setActivePiece,
} from "../../../store/features/gameSlice";
import { ActivePiece, Color } from "../../../types/board";
import { defaultBoardFEN } from "../../../utils/constant";
import { GameBoardProps } from "../../../types/game";

const GameBoard = ({
  onMove,
  orientation, //TODO: may be we can make this global state (game)
  turn,
  squareSize,
}: GameBoardProps) => {
  const playGame = useSelector((state: RootState) => state.game.value); //TODO: update this with custom selector
  const dispatch = useDispatch();

  useEffect(() => {
    if (playGame?.activePiece) {
      dispatch(
        generateCandidates({
          square: playGame.activePiece.square,
        }),
      ); //TODO: change this to global state (play game state)
    }
  }, [playGame?.activePiece, dispatch]);

  return (
    <ChessBoard
      onMove={onMove}
      onActive={(active: ActivePiece) => {
        //TODO: make type for this
        dispatch(setActivePiece({ activePiece: active as any })); //TODO: write this in different place
      }}
      active={playGame?.activePiece as any || null}
      orientation={orientation == "w" ? Color.WHITE : Color.BLACK}
      turn={turn == "w" ? Color.WHITE : Color.BLACK}
      boardFEN={playGame?.boardFEN || defaultBoardFEN}
      disable={false}
      candidates={playGame?.candidates || []}
      squareSize={squareSize}
    />
  );
};

export default GameBoard;
