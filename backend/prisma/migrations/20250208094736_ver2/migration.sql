/*
  Warnings:

  - Added the required column `seatNo` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "seatNo" INTEGER NOT NULL;
