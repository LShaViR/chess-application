//TODO: make changes such that game id will shown on url query parameter
//TODO: make premove logic (store que on frontend only)

import Navbar from "../component/navbar";
import { MOVE } from "../utils/messages";
import useSocket from "../hooks/useSocket"; //TODO: change code for this
import RightSection from "../features/game/component/RightSection";
import GameBoard from "../features/game/component/GameBoard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Color, ShortMoveType } from "../types/board";

const Game = () => {
  const socket = useSocket(); //TODO: make major changes for this
  const game = useSelector((state: RootState) => state.game.value);

  if (!socket) {
    return;
  }

  return (
    <div className="grid grid-cols-21 h-screen bg-background">
      <div className="col-span-1 h-screen">
        <Navbar />
      </div>
      <div className="col-span-20 flex justify-center h-screen overflow-y-scroll">
        <div className="lg:flex h-full w-full lg:gap-x-3 justify-center">
          <div className="flex justify-center h-full">
            <div className="grid grid-rows-12 grid-cols-1 h-screen py-8 w-full">
              <div className=" row-span-1"></div>
              <div className="row-span-10 flex flex-col justify-center w-full items-center">
                <GameBoard
                  onMove={(move: ShortMoveType) => {
                    console.log(move);
                    console.log("onMove in game");

                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move,
                        },
                      })
                    );
                  }}
                  orientation={game?.turn || Color.WHITE} //TODO: make other state for orientation
                  turn={game?.turn || Color.WHITE}
                  chess={game?.chess}
                />
              </div>
              <div className=" row-span-1"></div>
            </div>
          </div>
          <div className="h-screen max-w-screen py-0 lg:py-8 w-full lg:w-full lg:max-w-80">
            <RightSection socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
