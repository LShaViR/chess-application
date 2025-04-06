import ChessBoard from "../component/ChessBoard";
import Navbar from "../component/navbar";
import RightSection from "../component/RightSection";
import { MOVE } from "../utils/messages";
import useSocket from "../hooks/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ShortMove } from "chess.js";
import RightSectionTry, { App } from "../component/RightSectionTry";
const Game = () => {
  const socket = useSocket();
  const game = useSelector((state: RootState) => state.game.value);

  if (!socket) {
    return;
  }

  return (
    <div className="grid grid-cols-21 h-screen bg-background">
      <div className="row-span-1 hidden lg:block">
        <Navbar />
      </div>
      <div className="col-span-20 flex justify-center h-full">
        <div className="grid grid-cols-10 h-full w-full max-w-5xl justify-center">
          <div className="col-span-10 lg:col-span-6 flex justify-center w-full">
            <div className="grid grid-rows-12 grid-cols-1 h-screen py-8 max-w-xl w-full">
              <div className=" row-span-1"></div>
              <div className="row-span-10 flex flex-col justify-center w-full">
                <ChessBoard
                  onMove={(move: ShortMove) => {
                    console.log(move);

                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move,
                        },
                      })
                    );
                  }}
                />
              </div>
              <div className=" row-span-1"></div>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-4 bg-background h-screen py-8">
            <div className="col-span-10 lg:col-span-4 bg-navbar h-full py-8">
              {/*   startGame={() => { */}
              {/*     console.log(localStorage.getItem("tokenChess")); */}
              {/*     console.log(socket); */}
              {/**/}
              {/*     socket.send( */}
              {/*       JSON.stringify({ */}
              {/*         type: INIT_GAME, */}
              {/*       }) */}
              {/*     ); */}
              {/*   }} */}
              {/*   game={game} */}
              {/* /> */}
              {/* /> */}
              <RightSectionTry moves={game?.chess.history({ verbose: true })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
