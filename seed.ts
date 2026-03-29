import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Adding 500 test rows to your Neon database...");
  
  for (let i = 1; i <= 500; i++) {
    await prisma.workOrder.create({
      data: {
        status: "Assigned",
        wo: `WO-${1000 + i}`,
        dateDue: "25-04-26",
        dateReceived: "24-10-25",
        client: "Client " + i,
        address: `${i} Main St`,
        city: "New York",
        state: "NY",
        zip: "10001",
        contractor: "John Doe",
        workType: "Repair",
        photos: Math.floor(Math.random() * 20),
      },
    });
  }
  console.log("Done! You now have 500 rows.");
}

main();