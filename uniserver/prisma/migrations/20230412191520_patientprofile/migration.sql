/*
  Warnings:

  - Added the required column `bloodGroup` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `bloodGroup` ENUM('A', 'B', 'AB', 'O') NOT NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `fName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lName` VARCHAR(191) NOT NULL;
