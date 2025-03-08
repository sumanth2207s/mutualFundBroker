import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../dB/prismaConnect";

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const JWT_SECRET: any =
      process.env.JWT_SECRET;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const users: any = jwt.verify(token, JWT_SECRET);
    console.log(users)
    const user = await prisma.user.findUnique({
      where: {
        uuid: users.userUuid
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
