/*
  Warnings:

  - The primary key for the `Venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venta` table. All the data in the column will be lost.
  - Added the required column `idV` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adicion" DROP CONSTRAINT "Adicion_idVenta_fkey";

-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_id_fkey";

-- AlterTable
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_pkey",
DROP COLUMN "id",
ADD COLUMN     "idV" INTEGER NOT NULL,
ALTER COLUMN "mesa" DROP NOT NULL,
ALTER COLUMN "sala" DROP NOT NULL,
ALTER COLUMN "camarero" DROP NOT NULL,
ALTER COLUMN "medioPago" DROP NOT NULL,
ADD CONSTRAINT "Venta_pkey" PRIMARY KEY ("idV");

-- CreateTable
CREATE TABLE "Gasto" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "giroMes" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,

    CONSTRAINT "Gasto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adicion" ADD CONSTRAINT "Adicion_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "Venta"("idV") ON DELETE RESTRICT ON UPDATE CASCADE;
