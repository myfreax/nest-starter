/*
  Warnings:

  - Changed the type of `action` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PermissionAction" AS ENUM ('CREATEANY', 'REACDANY', 'UPDATEANY', 'DELETEANY', 'DELETEOWN', 'UPDATEOWN');

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "action",
ADD COLUMN     "action" "PermissionAction" NOT NULL;
