//TODO: make changes such that game id will shown on url query parameter
//TODO: make premove logic (store que on frontend only)

import { ShortMove } from "chess.js";

import ChessBoard from "../component/ChessBoard";
import Navbar from "../component/navbar";
import { MOVE } from "../utils/messages";
import useSocket from "../hooks/useSocket";
import RightSection from "../component/RightSection";

const Game = () => {
  const socket = useSocket();

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
          <div className="h-screen max-w-screen py-0 lg:py-8 w-full lg:w-full lg:max-w-80">
            <RightSection socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
