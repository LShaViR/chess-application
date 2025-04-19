import { PieceType, Square } from "chess.js"; // TODO: Change this
import { BoardType } from "../../types/board";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function fenToBoard(fen: string): BoardType {
  const board: BoardType = [];
  const rows = fen.split(" ")[0].split("/");

  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    const row: BoardType[number][number][] = [];
    const fenRow = rows[rowIndex];
    let fileIndex = 0;

    for (const char of fenRow) {
      if (!isNaN(Number(char))) {
        const emptySquares = Number(char);
        for (let i = 0; i < emptySquares; i++) {
          const square = (files[fileIndex] + (8 - rowIndex)) as Square;
          row.push(null);
          fileIndex++;
        }
      } else {
        const isUpper = char === char.toUpperCase();
        const type = char.toLowerCase() as PieceType;
        const color = isUpper ? "w" : "b";
        const square = (files[fileIndex] + (8 - rowIndex)) as Square;

        row.push({ type, color, square });
        fileIndex++;
      }
    }

    board.push(row);
  }

  return board;
}
