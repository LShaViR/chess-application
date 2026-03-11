//TODO: make changes for button and add resign, draw, other features
//TODO: put svg in different component
//TODO: make ui cleaner

import React, { useState } from "react";
import { renderMoves } from "../utils/moveTable";
import { INIT_GAME } from "../../../utils/messages";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PlayButton } from "../../../component/ui/playButton";

interface RightSectionProps {
  socket: WebSocket;
}

const RightSection: React.FC<RightSectionProps> = ({ socket }) => {
  const moves = useSelector(
    (state: RootState) => state.playGame.value?.history,
  );
  const [loading, setLoading] = useState(false);

  if (!moves) {
    return (
      <div className="flex flex-col h-full w-11/12 md:w-3/4 lg:w-full mx-auto bg-rightsection border-y-2 border-background text-gray-200 pt-20">
        <div className=" flex w-full justify-center gap-2">
          <PlayButton
            onClick={() => {
              if (!loading) {
                try {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    }),
                  );
                  setLoading(true);
                } catch (error) {
                  setLoading(false);
                }
              }
            }}
          >
            {loading ? "Matching..." : "Play Online"}
          </PlayButton>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full mx-auto bg-rightsection border-y-2 border-background text-gray-200">
      {/* Header Navigation */}
      <div className="flex justify-center gap-1 py-1 border-b border-background">
        <div
          className={`flex flex-col items-center justify-center px-3 py-2 w-15 hover:bg-dark-button bg-background`}
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
        </div>
      </div>
      {/* Moves List */}
      <div>
        <div className=" overflow-y-auto px-4 h-96">
          <table className="w-full text-xs ">
            <tbody>{renderMoves(moves)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
