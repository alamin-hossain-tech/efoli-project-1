/*
  Warnings:

  - You are about to drop the `_UserMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserMessages` DROP FOREIGN KEY `_UserMessages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserMessages` DROP FOREIGN KEY `_UserMessages_B_fkey`;

-- DropTable
DROP TABLE `_UserMessages`;
