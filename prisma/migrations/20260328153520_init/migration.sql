-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "wo" TEXT NOT NULL,
    "dateDue" TEXT NOT NULL,
    "dateReceived" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "customer" TEXT,
    "loan" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "admin" TEXT,
    "workType" TEXT NOT NULL,
    "photos" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);
