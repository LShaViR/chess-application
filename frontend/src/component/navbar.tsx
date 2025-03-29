import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavItem: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  bgColor?: string;
}> = ({ icon, active = false, onClick, bgColor }) => {
  return (
    <div
      className={` w-14 h-14 mx-auto my-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200 ${
        active ? "bg-dark-button-hover" : "hover:bg-dark-button-hover"
      } ${bgColor || ""}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full bg-navbar flex flex-col">
      <div className="flex-1 py-2">
        {/* Green Pawn */}
        <div
          className={` w-14 h-14 mx-auto my-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200`}
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-green-button-hover fill-current"
          >
            <path d="M17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
          </svg>
        </div>

        {/* Hand with White Pawn */}
        <NavItem
          icon={
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-orange-200 fill-current"
              >
                <path d="M21,9A1,1 0 0,1 22,10A1,1 0 0,1 21,11H16.53L16.4,12.21L14.2,17.15C14,17.65 13.47,18 12.86,18H8.5C7.7,18 7,17.27 7,16.5V10C7,9.61 7.16,9.26 7.43,9L11.63,4.1L12.4,4.84C12.6,5.03 12.72,5.29 12.72,5.58L12.69,5.8L11,9H21M2,18V10H5V18H2Z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          }
          active={activeIndex === 1}
          onClick={() => {
            navigate("/game");
            setActiveIndex(1);
          }}
        />
      </div>

      <div className="py-2 border-t border-gray-700">
        <NavItem
          icon={<LogOut size={20} color="#d1d5db" />}
          onClick={() => {
            const token = localStorage.getItem("tokenChess");
            if (token) {
              localStorage.setItem("tokenChess", "");
              navigate("/auth");
            } else {
              navigate("/auth");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
