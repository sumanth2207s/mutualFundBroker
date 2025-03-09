import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";

export const getPortfolio = async (req: Request, res: Response) => {
    try {
      const userUuid = (req.user as User)?.uuid;

      const investments = await prisma.investment.findMany({
        where: { userUuid },
        include: {
          scheme: {
            include: {
              amc: true
            }
          }
        }
      });
  
      const portfolio = investments.map(investment => {
        const currentValue = investment.units * investment.scheme.nav;
        const initialValue = investment.units * investment.buyNav;
        const profitLoss = currentValue - initialValue;
        const profitLossPercentage = (profitLoss / initialValue) * 100;
  
        return {
          ...investment,
          currentValue,
          initialValue,
          profitLoss,
          profitLossPercentage
        };
      });
  
      const totalValue = portfolio.reduce((sum, investment) => sum + investment.currentValue, 0);
  
      res.status(200).json({
        investments: portfolio,
        totalValue
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occured!' });
    }
  };