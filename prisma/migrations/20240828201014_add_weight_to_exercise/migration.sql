/*
  Warnings:

  - Added the required column `weight` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
