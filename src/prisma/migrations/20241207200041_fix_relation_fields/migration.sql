/*
  Warnings:

  - You are about to drop the column `activo` on the `adicion` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `gasto` table. All the data in the column will be lost.
  - You are about to drop the column `archivoid` on the `gasto` table. All the data in the column will be lost.
  - You are about to drop the column `fechacarga` on the `gasto` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `pago` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `archivoid` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `fechacarga` on the `venta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adicion" DROP COLUMN "activo";

-- AlterTable
ALTER TABLE "gasto" DROP COLUMN "activo",
DROP COLUMN "archivoid",
DROP COLUMN "fechacarga";

-- AlterTable
ALTER TABLE "pago" DROP COLUMN "activo";

-- AlterTable
ALTER TABLE "venta" DROP COLUMN "activo",
DROP COLUMN "archivoid",
DROP COLUMN "fechacarga";
