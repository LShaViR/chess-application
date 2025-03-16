import ChessBoard from "../component/ChessBoard";
import Navbar from "../component/navbar";
import { Loader } from "lucide-react";
import useStartGame from "../hooks/useStartGame";

const Game = () => {
  const { loading, turn } = useStartGame();

  if (loading || !turn) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-21 h-screen bg-background">
      <div className="row-span-1 hidden lg:block">
        <Navbar />
      </div>
      <div className="col-span-20 flex justify-center">
        <div className="grid grid-cols-10 w-full max-w-5xl justify-center">
          <div className="col-span-10 lg:col-span-6 flex justify-center w-full">
            <div className="grid grid-rows-12 grid-cols-1 h-screen  max-w-xl w-full">
              <div className=" row-span-1"></div>
              <div className="row-span-10 flex flex-col justify-center w-full">
                <ChessBoard turn={turn} />
              </div>
              <div className=" row-span-1"></div>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-4 bg-amber-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
