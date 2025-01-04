/*
  Warnings:

  - You are about to drop the column `adminId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_adminId_fkey`;

-- DropIndex
DROP INDEX `Ticket_adminId_fkey` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'CUSTOMER', 'SUPPORT_ENGINEER') NOT NULL DEFAULT 'CUSTOMER';

-- CreateTable
CREATE TABLE `TicketAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `TicketAssignment_ticketId_adminId_key`(`ticketId`, `adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketAssignment` ADD CONSTRAINT `TicketAssignment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAssignment` ADD CONSTRAINT `TicketAssignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
