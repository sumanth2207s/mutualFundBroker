import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";
import { rapidApiService } from "../services/rapidApi";

export const getOpenEndedSchemes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { amcUuid } = req.params;

    const amc = await prisma.aMC.findUnique({
      where: { uuid: amcUuid },
    });

    if (!amc) {
      return res.status(404).json({ message: "AMC not found" });
    }

    let schemes = await prisma.scheme.findMany({
      where: { amcUUid: amcUuid },
    });

    if (schemes.length === 0) {
      const masterData = await rapidApiService.getMasterData("CAMS");
      const latestNavData = await rapidApiService.getLatestNav();

      const amcSchemes: any = rapidApiService.filterSchemesByAMC(
        masterData,
        amc.name
      );

      for (const scheme of amcSchemes) {
        const navData: any = rapidApiService.getNavForScheme(
          scheme.Scheme_Code,
          latestNavData
        );

        if (navData) {
          await prisma.scheme.create({
            data: {
              schemeCode: scheme.Scheme_Code,
              schemeName: scheme.Scheme_Name,
              schemeType: "Open",
              nav: parseFloat(navData.NAV),
              lastUpdated: new Date(navData.Date),
              amcUUid: amcUuid,
            },
          });
        }
      }

      schemes = await prisma.scheme.findMany({
        where: { amcUUid: amcUuid },
      });
    }

    res.status(200).json(schemes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occured!" });
  }
};
