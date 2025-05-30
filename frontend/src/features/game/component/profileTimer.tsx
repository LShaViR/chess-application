//TODO: change color / make color for this

import React from "react";
import { User, Clock } from "lucide-react";
import { Color } from "../../../types/board";
import { useTimer } from "../hooks/useTimer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface ChessProfileTimerProps {
  color: Color;
}

export const ChessProfileTimer: React.FC<ChessProfileTimerProps> = ({
  color,
}) => {
  const { timer } = useTimer(color);
  const { username, avatarUrl, rating } = useSelector((state: RootState) =>
    color == Color.WHITE
      ? state.game.value?.player1
      : state.game.value?.player2,
  ) || { username: "unknown", avatarUrl: "", rating: 800 };
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className=" text-white px-3 py-2 h-full flex items-center justify-between w-full max-w-2xl">
      {/* Left side - Profile */}
      <div className="flex items-center space-x-2">
        {/* Avatar */}
        <div className="w-6 h-6 bg-gray-500 rounded-xs flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={14} className="text-gray-300" /> //TODO: change color
          )}
        </div>

        {/* Username, Rating and Bars */}
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium text-sm tracking-wide">
            {username}
          </span>
          <span className="text-gray-300 text-sm">({rating})</span>
          {/* Rating bars */}
        </div>
      </div>
      {/* Right side - Timer and Settings */}
      <div className="flex items-center space-x-2">
        <div
          className={`flex items-center space-x-1 ${color == Color.WHITE ? "bg-white text-black" : "bg-black text-white"} px-2 py-1 rounded`}
        >
          <Clock
            size={14}
            className={color == Color.WHITE ? "text-gray-700" : "text-gray-100"}
          />
          <span className="font-mono text-sm font-semibold">
            {formatTime(timer)}
          </span>
        </div>
      </div>
    </div>
  );
};
