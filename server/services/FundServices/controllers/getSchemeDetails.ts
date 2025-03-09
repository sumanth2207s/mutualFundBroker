import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";
import { rapidApiService } from "../services/rapidApi";

export const getSchemeDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      const { schemeCode } = req.params;
  
      let scheme = await prisma.scheme.findUnique({
        where: { schemeCode },
        include: {
          amc: true,
          NavHistory: {
            orderBy: {
              date: 'desc'
            },
            take: 10
          }
        }
      });
  
      if (!scheme) {
        return res.status(404).json({ message: 'Scheme not found' });
      }
  
      const latestNavData = await rapidApiService.getLatestNav();
      const navData = await rapidApiService.getNavForScheme(schemeCode, latestNavData);
      
      if (navData) {
        const latestNav = parseFloat(navData.Net_Asset_Value);
        const navDate = new Date(navData.Date);
        
        if (scheme.nav !== latestNav || scheme.lastUpdated.getTime() !== navDate.getTime()) {
          scheme = await prisma.scheme.update({
            where: { schemeCode },
            data: {
              nav: latestNav,
              lastUpdated: navDate
            },
            include: {
              amc: true,
              NavHistory: {
                orderBy: {
                  date: 'desc'
                },
                take: 10
              }
            }
          });
  
          await prisma.navHistory.create({
            data: {
              schemeUuid: scheme.uuid,
              nav: latestNav,
              date: navDate
            }
          });
        }
      }
  
      res.status(200).json(scheme);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occured!' });
    }
  };