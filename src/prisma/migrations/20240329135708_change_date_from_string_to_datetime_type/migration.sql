-- CreateTable
CREATE TABLE "Data" (
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Employee" (
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_name_key" ON "Data"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");
