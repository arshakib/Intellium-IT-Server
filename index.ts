import express, { Request, Response } from "express"; 
import cors from "cors"; 
import { PrismaClient } from "@prisma/client"; 

const app = express(); 
const prisma = new PrismaClient(); 

app.use(cors()); 
app.use(express.json());
const PORT = 5000;

app.get("/api/work-orders", async (req: Request, res: Response) => {
  try {
    const userId = "user_1";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = (page - 1) * limit;

    const savedSetting = await prisma.tableSetting.findUnique({
      where: { userId: userId }
    });

    let columnSelector: any = undefined;

    if (savedSetting && savedSetting.selectedColumns && savedSetting.selectedColumns.trim() !== "") {
      columnSelector = {};
      const columnsArray = savedSetting.selectedColumns.split(",");
      
      columnsArray.forEach((col) => {
        columnSelector[col.trim()] = true;
      });
      columnSelector["id"] = true;
    } 

    const workOrders = await prisma.workOrder.findMany({
      skip: skip,
      take: limit,
      select: columnSelector,
      orderBy: { createdAt: "desc" },
    });

    const totalCount = await prisma.workOrder.count();

    res.json({
      data: workOrders,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    //   isFiltered: !!columnSelector 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/settings-data", async (req: Request, res: Response) => {
    try {
        const userId = "user_1";
        const savedSetting = await prisma.tableSetting.findUnique({
            where: { userId: userId }
        });
        res.json({ data: savedSetting });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/settings", async (req: Request, res: Response) => {
  try {
    const { userId, columns } = req.body; 

    // if (columns === undefined || columns === null) {
    //   return res.status(400).json({ error: "The columns field is missing from the request" });
    // }

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const setting = await prisma.tableSetting.upsert({
      where: { userId: userId },
      update: { selectedColumns: columns },
      create: { 
        userId: userId, 
        selectedColumns: columns 
      },
    });

    res.json({ message: "Settings updated successfully", data: setting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save settings" });
  }
});

app.get("/api/work-orders/custom-view", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const columnsString = req.query.columns as string;

    let columnSelector: any = {};

    if (columnsString) {
      const selectedColumns = columnsString.split(",");
      selectedColumns.forEach((colName) => {
        const cleanName = colName.trim();
        columnSelector[cleanName] = true;
      });
      columnSelector["id"] = true;
    } else {
      return res.status(400).json({ message: "Please select at least one column to view." });
    }

    const workOrders = await prisma.workOrder.findMany({
      skip: skip,
      take: limit,
      select: columnSelector, 
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.workOrder.count();
    res.json({
      data: workOrders,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Filtering Error:", error);
    res.status(500).json({ error: "Could not fetch custom view data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend is running at http://localhost:${PORT}`);
});