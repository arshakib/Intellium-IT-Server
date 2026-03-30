import { Request, Response } from "express";
import prisma from "../config/db.js";

export const getWorkOrders = async (req: Request, res: Response) => {
  try {
    const userId = "user_1";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = (page - 1) * limit;

    const savedSetting = await prisma.tableSetting.findUnique({
      where: { userId }
    });

    let columnSelector: any = undefined;

    if (savedSetting?.selectedColumns?.trim()) {
      columnSelector = {};
      savedSetting.selectedColumns.split(",").forEach((col) => {
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
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error fetching work orders" });
  }
};