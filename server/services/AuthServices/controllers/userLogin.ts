import { Request, Response } from "express";
import { prisma } from "../../../shared/dB/prismaConnect";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET
const JWT_EXPIRES_IN: any = process.env.JWT_EXPIRES_IN

export const userLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  if (
    email !== user?.email ||
    !(await compare(password, user?.password as any))
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = sign({userUuid: user.uuid}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || "24h"
  })

  return res.status(200).json({message: "Login Successful", token})

};
