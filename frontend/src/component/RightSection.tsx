import { PlayButton } from "./ui/playButton";

const RightSection = ({
  startGame,
  game,
}: {
  startGame: () => void;
  game: any;
}) => {
  return (
    <div className="mt-18 w-full flex justify-center text-white">
      <div className=" grid w-full justify-center gap-2">
        {game ? (
          game.player1 + " vs " + game.player2
        ) : (
          <PlayButton
            onClick={() => {
              startGame();
            }}
          >
            Play Online
          </PlayButton>
        )}
      </div>
    </div>
  );
};

export default RightSection;
