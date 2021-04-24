/*
  Warnings:

  - A unique constraint covering the columns `[resource,attributes,action]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_resource_attributes_action_key" ON "Permission"("resource", "attributes", "action");
