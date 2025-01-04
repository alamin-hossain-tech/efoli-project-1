/*
  Warnings:

  - You are about to drop the `TicketAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TicketAssignment` DROP FOREIGN KEY `TicketAssignment_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `TicketAssignment` DROP FOREIGN KEY `TicketAssignment_ticketId_fkey`;

-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `adminId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `TicketAssignment`;

-- CreateTable
CREATE TABLE `TicketAssignee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `TicketAssignee_ticketId_adminId_key`(`ticketId`, `adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Ticket_adminId_fkey` ON `Ticket`(`adminId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAssignee` ADD CONSTRAINT `TicketAssignee_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAssignee` ADD CONSTRAINT `TicketAssignee_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
