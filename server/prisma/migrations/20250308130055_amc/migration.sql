-- CreateTable
CREATE TABLE `AMC` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `AMC_name_key`(`name`),
    UNIQUE INDEX `AMC_code_key`(`code`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scheme` (
    `uuid` VARCHAR(191) NOT NULL,
    `schemeCode` VARCHAR(191) NOT NULL,
    `schemeName` VARCHAR(191) NOT NULL,
    `schemeType` VARCHAR(191) NOT NULL DEFAULT 'Open',
    `nav` DOUBLE NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL,
    `amcUUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Scheme_schemeCode_key`(`schemeCode`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investment` (
    `uuid` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `schemeUuid` VARCHAR(191) NOT NULL,
    `units` DOUBLE NOT NULL,
    `buyNav` DOUBLE NOT NULL,
    `buyDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NavHistory` (
    `uuid` VARCHAR(191) NOT NULL,
    `schemeUuid` VARCHAR(191) NOT NULL,
    `nav` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scheme` ADD CONSTRAINT `Scheme_amcUUid_fkey` FOREIGN KEY (`amcUUid`) REFERENCES `AMC`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_schemeUuid_fkey` FOREIGN KEY (`schemeUuid`) REFERENCES `Scheme`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NavHistory` ADD CONSTRAINT `NavHistory_schemeUuid_fkey` FOREIGN KEY (`schemeUuid`) REFERENCES `Scheme`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
