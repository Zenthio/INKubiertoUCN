/*
  Warnings:

  - Added the required column `idP` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE pago_id_seq;
ALTER TABLE "Pago" ADD COLUMN     "idP" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('pago_id_seq');
ALTER SEQUENCE pago_id_seq OWNED BY "Pago"."id";
