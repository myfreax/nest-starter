/*
  Warnings:

  - The values [CREATEANY,READANY,UPDATEANY,DELETEANY,DELETEOWN,UPDATEOWN] on the enum `PermissionAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PermissionAction_new" AS ENUM ('update:any', 'read:any', 'delete:own', 'delete:any', 'create:any', 'update:own');
ALTER TABLE "Permission" ALTER COLUMN "action" TYPE "PermissionAction_new" USING ("action"::text::"PermissionAction_new");
ALTER TYPE "PermissionAction" RENAME TO "PermissionAction_old";
ALTER TYPE "PermissionAction_new" RENAME TO "PermissionAction";
DROP TYPE "PermissionAction_old";
COMMIT;
