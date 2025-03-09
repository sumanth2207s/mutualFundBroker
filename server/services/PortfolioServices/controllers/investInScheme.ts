import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";
import { User } from "@prisma/client";
import { rapidApiService } from "../../FundServices/services/rapidApi";
import { updateUserPortfolioValue } from "../helper/updateUserPortfolioValue";

export const investInScheme = async (req: Request, res: Response): Promise<any> => {
    try {
      const userUuid = (req.user as User)?.uuid;
      const { schemeUuid, amount } = req.body;
  
      if (!schemeUuid || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Please provide valid scheme ID and amount' });
      }
  
      const scheme = await prisma.scheme.findUnique({
        where: { uuid: schemeUuid }
      });
  
      if (!scheme) {
        return res.status(404).json({ message: 'Scheme not found' });
      }
  
      const latestNavData = await rapidApiService.getLatestNav();
      const navData = await rapidApiService.getNavForScheme(scheme.schemeCode, latestNavData);
      
      let latestNav = scheme.nav;
      if (navData) {
        latestNav = parseFloat(navData.Net_Asset_Value);
        
        if (scheme.nav !== latestNav) {
          await prisma.scheme.update({
            where: { uuid: schemeUuid },
            data: {
              nav: latestNav,
              lastUpdated: new Date(navData.Date)
            }
          });
        }
      }
      
      const units = amount / latestNav;
  
      const investment = await prisma.investment.create({
        data: {
          userUuid,
          schemeUuid: schemeUuid,
          units,
          buyNav: latestNav,
          buyDate: new Date()
        }
      });
  
      await updateUserPortfolioValue(userUuid);
  
      res.status(201).json(investment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occured!' });
    }
  };