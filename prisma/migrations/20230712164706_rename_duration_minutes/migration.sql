/*
  Warnings:

  - You are about to drop the column `duration_lesson` on the `courses` table. All the data in the column will be lost.
  - Added the required column `duration_lesson_in_minutes` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "duration_lesson";
ALTER TABLE "courses" ADD COLUMN     "duration_lesson_in_minutes" INT4 NOT NULL;
