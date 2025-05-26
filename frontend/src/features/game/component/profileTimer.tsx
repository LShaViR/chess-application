//TODO: change color / make color for this

import React, { useState, useEffect } from "react";
import { User, Clock } from "lucide-react";
import { Color } from "../../../types/board";

interface ChessProfileTimerProps {
  username?: string;
  rating?: number;
  initialTime?: number; // in seconds
  avatarUrl?: string;
  color: Color | undefined;
  onTimeUp?: () => void;
}

export const ChessProfileTimer: React.FC<ChessProfileTimerProps> = ({
  username = "unknown",
  rating = 800,
  initialTime = 600,
  avatarUrl,
  color = Color.WHITE,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

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
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};
