import express, { Request, Response } from "express"; 
import cors from "cors"; 
import workOrderRoutes from "./src/routes/workOrder.routes"; 
import settingsRoutes from "./src/routes/settings.routes"; 

const app = express(); 
app.use(express.json());
const allowedOrigins = [
  'https://intellium-it.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS Policy Error'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
const PORT = 5000;

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
  app.listen(PORT, () => {
    console.log(`🚀 Backend is running at http://localhost:${PORT}`);
  });
}