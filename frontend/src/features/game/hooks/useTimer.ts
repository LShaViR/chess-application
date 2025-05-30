import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { Color } from "../../../types/board";

const useTimer = (color: Color) => {
  const initialTime = useSelector((state: RootState) =>
    state.game.value
      ? state.game.value[
      color == Color.WHITE ? "player1TimeLeft" : "player2TimeLeft"
      ]
      : 0,
  );
  const gameTurn = useSelector(
    (state: RootState) => state.game.value?.gameTurn,
  );
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimer(initialTime);
  }, [initialTime]);

  useEffect(() => {
    setIsRunning(color == gameTurn ? true : false);
  }, [gameTurn, color]);

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 100) {
            setIsRunning(false);
            return 0;
          }
          return prev - 100;
        });
      });
    }
    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return { timer };
};

export { useTimer };
