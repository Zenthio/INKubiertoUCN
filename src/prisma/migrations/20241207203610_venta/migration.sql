/*
  Warnings:

  - The primary key for the `venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `venta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "adicion" DROP CONSTRAINT "fk_venta";

-- AlterTable
CREATE SEQUENCE venta_idv_seq;
ALTER TABLE "venta" DROP CONSTRAINT "venta_pkey",
DROP COLUMN "id",
ALTER COLUMN "idv" SET DEFAULT nextval('venta_idv_seq'),
ADD CONSTRAINT "venta_pkey" PRIMARY KEY ("idv");
ALTER SEQUENCE venta_idv_seq OWNED BY "venta"."idv";

-- AddForeignKey
ALTER TABLE "adicion" ADD CONSTRAINT "fk_venta" FOREIGN KEY ("idventa") REFERENCES "venta"("idv") ON DELETE CASCADE ON UPDATE NO ACTION;
