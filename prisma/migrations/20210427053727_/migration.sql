/*
  Warnings:

  - A unique constraint covering the columns `[resource,attributes,action]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `resource` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PermissionResource" AS ENUM ('user', 'permission', 'role');

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "resource",
ADD COLUMN     "resource" "PermissionResource" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permission" ON "Permission"("resource", "attributes", "action");
