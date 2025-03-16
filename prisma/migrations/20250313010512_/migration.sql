/*
  Warnings:

  - Added the required column `creator_name` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "creator_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creator_name_fkey" FOREIGN KEY ("creator_name") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
