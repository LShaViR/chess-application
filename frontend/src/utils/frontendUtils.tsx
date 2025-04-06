//TODO: name change for this file

import { Move } from "chess.js";
import React from "react";

const renderMoves = (moves: Move[]): React.ReactElement[] => {
  const moveTableRow: React.ReactElement[] = [];
  for (let i = 1; i < moves.length; i += 2) {
    moveTableRow.push(
      <tr className={`${i % 4 == 1 ? "bg-navbar" : "bg-background"}`}>
        <td className="pl-4 pr-2 text-gray-500 w-10">{(i + 1) / 2}.</td>
        <td className="px-2">{moves[i - 1].san}</td>
        <td className="px-2">{moves[i].san}</td>
      </tr>
    );
  }
  if (moves.length % 2 == 1) {
    moveTableRow.push(
      <tr
        className={`${moves.length % 4 == 1 ? "bg-navbar" : "bg-background"}`}
      >
        <td className="pl-4 pr-2 text-gray-500 w-10">
          {(moves.length + 1) / 2}.
        </td>
        <td className="px-2">{moves[moves.length - 1].san}</td>
        <td className="px-2"></td>
      </tr>
    );
  }
  return moveTableRow;
};

export { renderMoves };
