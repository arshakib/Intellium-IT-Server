-- CreateTable
CREATE TABLE "TableSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL DEFAULT 'default-user',
    "selectedColumns" TEXT NOT NULL,
    "pageSize" INTEGER NOT NULL DEFAULT 100,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TableSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TableSetting_userId_key" ON "TableSetting"("userId");
