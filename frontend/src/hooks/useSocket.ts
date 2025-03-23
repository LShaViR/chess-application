import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/features/gameSlice";
import { useEffect, useState } from "react";
import { newPlayGame } from "../store/features/playGameSlice";
import { Chess } from "chess.js";
import { RootState } from "../store/store";
import useMakeMove from "./useMakeMove";

const useSocket = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const game = useSelector((state: RootState) => state.game.value);
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const makeMove = useMakeMove();
  const [start, setStart] = useState(false);

  const startGame = () => {
    setStart(true);
  };

  useEffect(() => {
    if (!start) {
      return;
    }
    const data: {
      player1: string;
      player2: string;
      turn: "w" | "b";
      gameStatus: "running" | "finished";
      gameId: string;
      gamePGN?: string;
    } = {
      player1: "lucky",
      player2: "rathore",
      turn: "b",
      gameStatus: "running",
      gameId: "abcdefg",
      gamePGN: ` 1. e4 e5 2. Nf3 `,
    };
    const chess = new Chess();
    if (data.gamePGN) {
      chess.load_pgn(data.gamePGN);
    }
    dispatch(
      newGame({
        player1: data.player1,
        player2: data.player2,
        turn: data.turn,
        gameStatus: data.gameStatus,
        gameId: data.gameId,
        chess: chess,
      })
    );
    dispatch(
      newPlayGame({
        candidates: [],
        activePiece: "",
        gameEnd: "",
        board: chess.board(),
      })
    );

    setLoading(false);
  }, [start]);

  useEffect(() => {
    console.log(game?.chess.history({ verbose: true }));
    const length = game?.chess.moves().length;

    if (length && game.chess.turn() != game.turn) {
      const random = Math.floor(length * Math.random());
      const turn = game.turn == "w" ? "b" : "w";
      makeMove(game.chess.moves({ verbose: true })[random], game.chess, turn);
    }
  }, [game, playGame]);
  return { loading, turn: game?.turn, start, startGame };
};

export default useSocket;
