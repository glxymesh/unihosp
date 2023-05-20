/*
  Warnings:

  - The required column `notificationChannel` was added to the `Doctor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `notificationChannel` was added to the `Patient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `notificationChannel` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `notificationChannel` VARCHAR(191) NOT NULL;
