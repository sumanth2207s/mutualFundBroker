import { hash } from "bcrypt";
import { prisma } from "../../../shared/dB/prismaConnect";
import { Request, Response } from "express";

export const userRegister = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  const encryptedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email: email,
        password: encryptedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User registered successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error occured!" });
  }
};
