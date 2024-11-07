-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "creacion" TIMESTAMP(3) NOT NULL,
    "cerrada" TIMESTAMP(3),
    "caja" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "mesa" INTEGER NOT NULL,
    "sala" TEXT NOT NULL,
    "camarero" TEXT NOT NULL,
    "medioPago" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tipoVenta" TEXT NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);
