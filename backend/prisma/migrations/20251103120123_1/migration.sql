/*
  Warnings:

  - You are about to drop the column `gameStatus` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `player1Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `player2Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `turn` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `moveNo` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `turn` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blackPlayerId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeControl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitePlayerId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `after` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `before` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveNumber` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `san` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSpent` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('WHITE_WINS', 'BLACK_WINS', 'DRAW');

-- CreateEnum
CREATE TYPE "TimeControl" AS ENUM ('CLASSICAL', 'RAPID', 'BLITZ');

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_player1Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_player2Id_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameStatus",
DROP COLUMN "player1Id",
DROP COLUMN "player2Id",
DROP COLUMN "turn",
ADD COLUMN     "blackPlayerId" TEXT NOT NULL,
ADD COLUMN     "currentFEN" TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "result" "GameResult" NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startingFEN" TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
ADD COLUMN     "status" "GameStatus" NOT NULL,
ADD COLUMN     "timeControl" "TimeControl" NOT NULL,
ADD COLUMN     "whitePlayerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "moveNo",
DROP COLUMN "turn",
ADD COLUMN     "after" TEXT NOT NULL,
ADD COLUMN     "before" TEXT NOT NULL,
ADD COLUMN     "moveNumber" INTEGER NOT NULL,
ADD COLUMN     "san" TEXT NOT NULL,
ADD COLUMN     "timeSpent" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Player";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 800,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_whitePlayerId_fkey" FOREIGN KEY ("whitePlayerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blackPlayerId_fkey" FOREIGN KEY ("blackPlayerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
