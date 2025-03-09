import { User } from "@prisma/client";
import { Request, Response } from "express";
import { updateUserPortfolioValue } from "../helper/updateUserPortfolioValue";

export const updatePortfolioValue = async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User)?.uuid;
      
      // Update portfolio value
      const result = await updateUserPortfolioValue(userId);
  
      res.status(200).json({ message: 'Portfolio value updated', value: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occured!' });
    }
  };