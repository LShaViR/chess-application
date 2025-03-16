import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/features/gameSlice";
import { useEffect, useState } from "react";
import { newPlayGame } from "../store/features/playGameSlice";
import { Chess } from "chess.js";
import { RootState } from "../store/store";

const useStartGame = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const game = useSelector((state: RootState) => state.game.value);

  useEffect(() => {
    dispatch(
      newGame({
        player1: "",
        player2: "",
        turn: "w",
        gameStatus: "running",
        gameId: "",
        chess: new Chess(),
      })
    );
    dispatch(
      newPlayGame({
        candidates: [],
        activePiece: "",
        gameEnd: "",
      })
    );
    setLoading(false);
  }, []);
  return { loading, turn: game?.turn };
};

export default useStartGame;
