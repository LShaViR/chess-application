import { Color, ShortMoveType } from "../../../types/board";
import GameBoard from "./GameBoard";
import { useEffect, useRef, useState } from "react";
import { ChessProfileTimer } from "./profileTimer";

export function GameLeftSection({
  onMove,
  turn,
}: {
  onMove: (move: ShortMoveType) => void;
  turn: Color | undefined;
}) {
  const parentRef = useRef(null);
  const [squareSize, setSquareSize] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSquareSize(Math.min(width, height - 100));
      }
    });

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        observer.unobserve(parentRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full w-full ">
      <div className="flex flex-col w-full h-full justify-center items-center lg:items-end gap-2">
        <div
          ref={parentRef}
          className="w-full h-full flex flex-col justify-center items-center lg:items-end"
        >
          <div
            style={{
              width: `${squareSize}px`,
              height: "50px",
            }}
            className={`bg-navbar`}
          >
            <ChessProfileTimer />
          </div>
          <div
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
            }}
          >
            <GameBoard
              onMove={onMove}
              orientation={turn || Color.WHITE} //TODO: make other state for orientation
              turn={turn || Color.WHITE}
            />
          </div>
          <div
            style={{
              width: `${squareSize}px`,
              height: "50px",
            }}
            className={`bg-navbar`}
          >
            <ChessProfileTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
