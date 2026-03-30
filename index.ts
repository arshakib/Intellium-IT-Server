import express, { Request, Response } from "express"; 
import cors from "cors"; 
import { PrismaClient } from "@prisma/client"; 
import workOrderRoutes from "@/routes/workOrder.routes";
import settingsRoutes from "@/routes/settings.routes";

const app = express(); 
const prisma = new PrismaClient(); 

app.use(cors()); 
app.use(express.json());
const PORT = 5000;

app.get('/', (req: Request, res: Response) => {
  
  res.send({
    success: true,
    message: "Server is running!",
  });
});

app.use("/api/work-orders", workOrderRoutes);
app.use("/api/settings", settingsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend is running at http://localhost:${PORT}`);
});