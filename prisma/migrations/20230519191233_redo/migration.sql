/*
  Warnings:

  - You are about to drop the column `paymentIntentId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentIntentID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Order_paymentIntentId_key` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentIntentId`,
    ADD COLUMN `paymentIntentID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_paymentIntentID_key` ON `Order`(`paymentIntentID`);