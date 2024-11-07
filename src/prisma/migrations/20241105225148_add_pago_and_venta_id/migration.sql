/*
  Warnings:

  - Made the column `cerrada` on table `Venta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Venta" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "cerrada" SET NOT NULL;
DROP SEQUENCE "Venta_id_seq";

-- CreateTable
CREATE TABLE "Adicion" (
    "id" SERIAL NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,
    "producto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "costoBase" INTEGER NOT NULL,
    "costoModif" INTEGER NOT NULL,
    "costoTot" INTEGER NOT NULL,
    "creadoPor" TEXT NOT NULL,
    "cocina" TEXT NOT NULL,
    "cancelada" BOOLEAN NOT NULL,

    CONSTRAINT "Adicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "medioPago" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "caja" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "mesa" INTEGER NOT NULL,
    "cancelado" BOOLEAN NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adicion" ADD CONSTRAINT "Adicion_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_id_fkey" FOREIGN KEY ("id") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
