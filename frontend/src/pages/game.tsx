import { useEffect, useState } from "react";
import ChessBoard from "../component/ChessBoard";
import Navbar from "../component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/features/gameSlice";
import { newPlayGame } from "../store/features/playGameSlice";
import { Chess } from "chess.js";
import { Loader } from "lucide-react";
import { RootState } from "../store/store";

const Game = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const game = useSelector((state: RootState) => state.game.value);
  useEffect(() => {
    dispatch(
      newGame({
        player1: "",
        player2: "",
        turn: "b",
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
        timer: { player1: 10, player2: 10 },
      })
    );
    setLoading(false);
  }, []);

  if (loading || !game) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-21 h-screen bg-background">
      <div className="row-span-1 hidden lg:block">
        <Navbar />
      </div>
      <div className="col-span-20 flex justify-center">
        <div className="grid grid-cols-10 w-full max-w-5xl justify-center">
          <div className="col-span-10 lg:col-span-6 flex justify-center w-full">
            <div className="grid grid-rows-12 grid-cols-1 h-screen  max-w-xl w-full">
              <div className=" row-span-1"></div>
              <div className="row-span-10 flex flex-col justify-center w-full">
                <ChessBoard turn={game.turn} />
              </div>
              <div className=" row-span-1"></div>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-4 bg-amber-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
