/*
  Warnings:

  - You are about to drop the column `adminId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_adminId_fkey`;

-- DropIndex
DROP INDEX `Ticket_adminId_fkey` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `adminId`,
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Ticket_creatorId_fkey` ON `Ticket`(`creatorId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
