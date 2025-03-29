import { useNavigate } from "react-router-dom";
import SideNavbar from "../component/navbar";
import Logo from "../component/ui/logo";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-21 h-screen">
      <div className="col-span-1 bg-navbar">
        <SideNavbar />
      </div>
      <div className="col-span-10 bg-background grid justify-center items-center">
        <img src="/chessBoard.png" alt="" />
      </div>
      <div className="col-span-10 bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-white text-6xl font-bold mb-8">
            Play Chess Online
            <br />
            on the #1 Site!
          </h1>
        </div>
        <div className="w-full max-w-xl space-y-6">
          <div
            className="w-full bg-green-button hover:bg-green-button-hover text-white text-bold rounded-xl px-5  py-8 flex items-center transition-colors duration-200 shadow-lg  cursor-pointer"
            onClick={() => {
              navigate("/game");
            }}
          >
            <div className="flex-shrink-0 mr-4 relative">
              <div className=" bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center relative">
                <Logo size={14} />
              </div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">Play Online</div>
              <div className="text-lg">Play with someone at your level</div>
            </div>
          </div>

          {/* Play Bots Button */}
          <div className="w-full bg-dark-button hover:bg-dark-button-hover text-white text-bold rounded-xl px-5  py-8 flex items-center transition-colors duration-200 shadow-lg cursor-pointer">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-10 h-10"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6l-2 2v2h8v-2l-2-2h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H4V4h16v12m-4-2h2V8h-2v6m-6-6v6h2V8h-2m-2 6h-2V8h2v6z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">Play Bots</div>
              <div className="text-lg">Play vs customizable training bots</div>
              <div className="text-red-400">currently unavailable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
