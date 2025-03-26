import useSocket from "../hooks/useSocket";
import { PlayButton } from "./ui/playButton";

const RightSection = () => {
  const { turn, start, startGame } = useSocket();
  return (
    <div className="mt-18 w-full flex justify-center text-white">
      {start ? (
        turn
      ) : (
        <div className=" grid w-full justify-center gap-2">
          <PlayButton
            onClick={() => {
              startGame();
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
