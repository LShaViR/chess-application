import ChessBoard from "../component/ChessBoard";
import Navbar from "../component/navbar";
import { BLACK, WHITE } from "../utils/constant";

const Game = () => {
  return (
    <div className="grid grid-cols-21 h-screen bg-background">
      <div className="row-span-1 hidden lg:block">
        <Navbar />
      </div>
      <div className="col-span-20 flex justify-center">
        <div className="grid grid-cols-10">
          <div className="grid grid-rows-12 grid-cols-1 h-screen col-span-6">
            <div className="bg-dark-button row-span-1"></div>
            <div className="row-span-10 flex flex-col justify-center">
              <ChessBoard turn={BLACK} />
            </div>
            <div className="bg-dark-button row-span-1 hidden md:block"></div>
          </div>
          <div className="col-span-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
