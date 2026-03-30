import { Request, Response } from "express";
import prisma from "../config/db";

export const getSettings = async (req: Request, res: Response) => {
  try {
    const userId = "user_1";
    const savedSetting = await prisma.tableSetting.findUnique({ where: { userId } });
    res.json({ data: savedSetting });
  } catch (error) {
    res.status(500).json({ error: "Server error fetching settings" });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { userId, columns } = req.body;
    if (!userId) return res.status(400).json({ error: "UserId is required" });

    const setting = await prisma.tableSetting.upsert({
      where: { userId },
      update: { selectedColumns: columns },
      create: { userId, selectedColumns: columns },
    });

    res.json({ message: "Settings updated successfully", data: setting });
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};