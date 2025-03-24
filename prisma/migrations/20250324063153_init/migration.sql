/*
  Warnings:

  - You are about to drop the column `creator_name` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_creator_name_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "creator_name";
