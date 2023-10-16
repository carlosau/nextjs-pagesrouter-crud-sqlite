/*
  Warnings:

  - You are about to drop the column `is_ad` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `isAd` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idhotmart" INTEGER NOT NULL,
    "isAd" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "vsl" TEXT,
    "author" TEXT,
    "evaluacion" REAL,
    "categoria" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "productor" TEXT,
    "idioma" TEXT NOT NULL,
    "pais" TEXT,
    "suscripcion" TEXT NOT NULL,
    "comission" REAL NOT NULL,
    "cashback" REAL,
    "descuento" BOOLEAN NOT NULL,
    "precio_regular" REAL,
    "precio" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_Curso" ("author", "body", "cashback", "categoria", "comission", "content", "createdAt", "descuento", "evaluacion", "formato", "id", "idhotmart", "idioma", "pais", "precio", "precio_regular", "productor", "slug", "suscripcion", "title", "updateAt", "vsl") SELECT "author", "body", "cashback", "categoria", "comission", "content", "createdAt", "descuento", "evaluacion", "formato", "id", "idhotmart", "idioma", "pais", "precio", "precio_regular", "productor", "slug", "suscripcion", "title", "updateAt", "vsl" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
