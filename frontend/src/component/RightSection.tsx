import React, { useState } from "react";
import { renderMoves } from "../utils/frontendUtils";
import { EXIT_GAME, INIT_GAME } from "../utils/messages";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PlayButton } from "./ui/playButton";

interface RightSectionProps {
  socket: WebSocket;
}

enum SELECTED {
  PLAY,
  NEWGAME,
}

const RightSection: React.FC<RightSectionProps> = ({ socket }) => {
  const moves = useSelector(
    (state: RootState) => state.playGame.value?.history
  );
  const [selected, setSelected] = useState(SELECTED.PLAY);
  if (!moves) {
    return (
      <div className="flex flex-col h-full w-full mx-auto bg-rightsection border-y-2 border-background text-gray-200 pt-20">
        <div className=" grid w-full justify-center gap-2">
          <PlayButton
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
            }}
          >
            Play Online
          </PlayButton>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full mx-auto bg-rightsection border-y-2 border-background text-gray-200">
      {/* Header Navigation */}
      <div className="flex justify-center gap-1 py-1 border-b border-background">
        <button
          className={`flex flex-col items-center justify-center px-3 py-2 w-15 hover:bg-dark-button ${
            selected == SELECTED.PLAY ? "bg-background" : ""
          }`}
          onClick={() => {
            setSelected(SELECTED.PLAY);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
          </svg>
          <span className="text-[0.7rem] w-full ">Play</span>
        </button>
        <button
          className={`flex flex-col items-center justify-center px-3 py-2 w-15 hover:bg-dark-button  ${
            selected == SELECTED.NEWGAME ? "bg-background" : ""
          }`}
          onClick={() => {
            setSelected(SELECTED.NEWGAME);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
          </svg>
          <span className="text-[0.7rem] w-full ">New Game</span>
        </button>
      </div>
      {/* Moves List */}
      {selected == SELECTED.PLAY ? (
        <div>
          <div className=" overflow-y-auto px-4 h-96">
            <table className="w-full text-xs ">
              <tbody>{renderMoves(moves)}</tbody>
            </table>
          </div>
          <div className="flex justify-start items-center border-t border-gray-700 px-4 py-2">
            <button className="text-gray-400 px-2 flex items-center gap-1">
              <span>½</span>
              <span>Draw</span>
            </button>
            <button className="text-gray-400 px-2 flex items-center gap-1">
              <span>🏳️</span>
              <span>Resign</span>
            </button>
          </div>
        </div>
      ) : (
        <div className=" grid w-full mt-10 justify-center gap-2">
          <PlayButton
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: EXIT_GAME, //TODO: make changes for resign or abort for now only resign will be there
                })
              );
            }}
          >
            Play Online
          </PlayButton>
        </div>
      )}
    </div>
  );
};

export default RightSection;
