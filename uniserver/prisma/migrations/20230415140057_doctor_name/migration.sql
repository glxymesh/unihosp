/*
  Warnings:

  - Added the required column `fName` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `fName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lName` VARCHAR(191) NOT NULL;
