/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Ticket` table. All the data in the column will be lost.
  - The values [SUPPORT_ENGINEER] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_creatorId_fkey`;

-- DropIndex
DROP INDEX `Ticket_creatorId_fkey` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `creatorId`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';
