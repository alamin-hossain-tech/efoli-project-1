/*
  Warnings:

  - A unique constraint covering the columns `[autoGenId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autoGenId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `autoGenId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_autoGenId_key` ON `Ticket`(`autoGenId`);
