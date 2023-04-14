/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `VerificationMailRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `VerificationMailRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VerificationMailRequest_email_key` ON `VerificationMailRequest`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `VerificationMailRequest_contact_key` ON `VerificationMailRequest`(`contact`);
