-- AlterTable
CREATE SEQUENCE tablesetting_id_seq;
ALTER TABLE "TableSetting" ALTER COLUMN "id" SET DEFAULT nextval('tablesetting_id_seq');
ALTER SEQUENCE tablesetting_id_seq OWNED BY "TableSetting"."id";
