import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";
import { rapidApiService } from "../services/rapidApi";

export const getAMCs = async (req: Request, res: Response): Promise<any> => {
  try {
    let amcs = await prisma.aMC.findMany(
      {
        orderBy: {
          createdAt: 'desc'
        }
      }
    );

    if (amcs.length === 0) {
      const masterData = await rapidApiService.getMasterData("CAMS");
      const uniqueAMCs: any = [
        ...new Set(masterData.map((item: any) => item.AMC_Code)),
      ].filter(Boolean);

      for (const amcName of uniqueAMCs) {
        const amcData = {
          name: amcName,
          code: amcName
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, 10)
            .toUpperCase(),
        };

        await prisma.aMC.create({ data: amcData });
      }

      amcs = await prisma.aMC.findMany();
    }

    res.status(200).json(amcs);
  } catch (error) {
    console.error(error);
    if ((error = "Failed to fetch master data")) {
      return res
        .status(502)
        .json({ message: "Error fetching master data from RapidAPI" });
    }
    res.status(500).json({ message: "Error occured!" });
  }
};
