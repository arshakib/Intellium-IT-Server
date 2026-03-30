import express, { Request, Response } from "express"; 
import cors from "cors"; 
import workOrderRoutes from "./src/routes/workOrder.routes.js"; 
import settingsRoutes from "./src/routes/settings.routes.js"; 

const app = express(); 
app.use(cors({
  origin: ["https://intellium-it.vercel.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server is running!",
  });
});

app.use("/api/work-orders", workOrderRoutes);
app.use("/api/settings", settingsRoutes);

export default app; 

if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server: http://localhost:${PORT}`);
  });
}