//TODO: make changes such that game id will shown on url query parameter
//TODO: make premove logic (store que on frontend only)
//TODO: fix error hooks sequence and wrap component in error boundary

import { BottomNavbar, SideNavbar } from "../component/navbar";
import { MOVE } from "../utils/messages";
import useSocket from "../hooks/useSocket"; //TODO: change code for this
import RightSection from "../features/game/component/RightSection";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ShortMoveType } from "../types/board";
import useMessageHandler from "../features/game/hooks/useMessageHandler";
import { GameLeftSection } from "../features/game/component/leftGameSection";
import GameEndPopup from "../features/game/component/GameEndPopup";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const checkLogin = async () => {
  const token = localStorage.getItem("tokenChess");
  if (!token) {
    throw new Error("token does not exist");
  }
  const response = await axios.get(`${BACKEND_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const Game = () => {
  const game = useSelector((state: RootState) => state.game.value);
  const socket = useSocket(); //TODO: make major changes for this
  const [user, setUser] = useState<Object | null>(null);
  useMessageHandler(socket);

  useEffect(() => {
    checkLogin()
      .then((response) => {
        setUser(response);
      })
      .catch((_error) => {
        window.location.href = "/auth";
      });
  }, []);

  if (!user) {
    return <></>;
  }

  if (!socket) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-21 grid-rows-18 md:grid-rows-1 h-screen bg-background">
      <div className="hidden md:block md:w-14 h-screen">
        <SideNavbar />
      </div>
      <div className="col-span-21 md:col-span-20 row-span-17 md:row-span-1 flex justify-center overflow-y-scroll relative">
        <div className="lg:grid lg:grid-cols-9 h-full w-full lg:gap-x-3 max-w-4xl">
          <div className="col-span-6 flex justify-center h-full relative">
            <GameEndPopup />
            <GameLeftSection
              onMove={(move: ShortMoveType) => {
                //console.log(move);
                //console.log("onMove in game");

                socket.send(
                  JSON.stringify({
                    type: MOVE,
                    payload: {
                      move,
                    },
                  }),
                );
              }}
              turn={game?.turn}
            />
          </div>
          <div className="col-span-3 h-screen max-w-screen w-full ">
            <RightSection socket={socket} />
          </div>
        </div>
      </div>
      <div className="row-span-1  col-span-21 md:hidden w-full">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Game;
