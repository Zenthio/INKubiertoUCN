-- CreateTable
CREATE TABLE "adicion" (
    "id" SERIAL NOT NULL,
    "idventa" INTEGER NOT NULL,
    "fechapago" TIMESTAMP(6) NOT NULL,
    "producto" VARCHAR(255) NOT NULL,
    "categoria" VARCHAR(255) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "costobase" INTEGER NOT NULL,
    "costomodif" INTEGER NOT NULL,
    "costotot" INTEGER NOT NULL,
    "creadopor" VARCHAR(255) NOT NULL,
    "cocina" VARCHAR(255) NOT NULL,
    "cancelada" VARCHAR(255),
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "adicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gasto" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,
    "giromes" VARCHAR(255) NOT NULL,
    "item" VARCHAR(255) NOT NULL,
    "monto" INTEGER NOT NULL,
    "archivoid" VARCHAR(255) NOT NULL,
    "fechacarga" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "gasto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pago" (
    "id" SERIAL NOT NULL,
    "idp" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,
    "mediopago" VARCHAR(255) NOT NULL,
    "monto" INTEGER NOT NULL,
    "caja" VARCHAR(255) NOT NULL,
    "sala" VARCHAR(255),
    "mesa" INTEGER,
    "cancelado" VARCHAR(255),
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta" (
    "idv" SERIAL NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL,
    "creacion" TIMESTAMP(6) NOT NULL,
    "cerrada" TIMESTAMP(6) NOT NULL,
    "caja" VARCHAR(255) NOT NULL,
    "estado" VARCHAR(255) NOT NULL,
    "mesa" INTEGER,
    "sala" VARCHAR(255),
    "camarero" VARCHAR(255),
    "mediopago" VARCHAR(255),
    "total" REAL NOT NULL,
    "tipoventa" VARCHAR(255) NOT NULL,
    "archivoid" VARCHAR(255) NOT NULL,
    "fechacarga" TIMESTAMP(6) NOT NULL,
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("idv")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "adicion" ADD CONSTRAINT "fk_venta" FOREIGN KEY ("idventa") REFERENCES "venta"("idv") ON DELETE CASCADE ON UPDATE NO ACTION;
