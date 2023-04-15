-- CreateTable
CREATE TABLE `Avatars` (
    `model` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `createAt` VARCHAR(191) NOT NULL,
    `updatedAt` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,

    UNIQUE INDEX `Avatars_userId_key`(`userId`),
    PRIMARY KEY (`model`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Avatars` ADD CONSTRAINT `Avatars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
