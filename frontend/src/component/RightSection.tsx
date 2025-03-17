import { PlayButton } from "./ui/playButton";

const RightSection = () => {
  return (
    <div className="mt-18 w-full flex justify-center">
      <div className="grid gap-2">
        <div className=" grid w-full justify-center gap-2">
          <PlayButton onClick={() => {}}>Play Online</PlayButton>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
