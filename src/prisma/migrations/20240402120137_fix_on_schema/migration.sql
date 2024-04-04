/*
  Warnings:

  - You are about to drop the column `Date` on the `Shark` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Shark` table. All the data in the column will be lost.
  - You are about to drop the column `WelcomeMessage` on the `Shark` table. All the data in the column will be lost.
  - Added the required column `date` to the `Shark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Shark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeMessage` to the `Shark` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "welcomeMessage" TEXT NOT NULL
);
INSERT INTO "new_Shark" ("id") SELECT "id" FROM "Shark";
DROP TABLE "Shark";
ALTER TABLE "new_Shark" RENAME TO "Shark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
