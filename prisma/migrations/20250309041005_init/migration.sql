/*
  Warnings:

  - You are about to drop the column `org_name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `organization` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "org_name",
ADD COLUMN     "organization" TEXT NOT NULL;
