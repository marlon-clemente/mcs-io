/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tb_create_password` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `tb_create_password` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `tb_create_password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expireToken` to the `tb_create_password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `tb_create_password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_create_password" DROP COLUMN "createdAt",
DROP COLUMN "token",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expireToken" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_create_password_hash_key" ON "tb_create_password"("hash");
