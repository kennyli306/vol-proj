-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street_number" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
