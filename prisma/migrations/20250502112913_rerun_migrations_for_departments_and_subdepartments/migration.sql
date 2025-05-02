/*
  Warnings:

  - You are about to drop the column `parentId` on the `Department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_parentId_fkey";

-- DropIndex
DROP INDEX "Department_name_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "SubDepartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubDepartment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubDepartment" ADD CONSTRAINT "SubDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
