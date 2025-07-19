import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { prisma } from "../utils/db";

type LoginBody = {
  email: string;
  password: string;
};

const loginHandler = async (req: Request, res: Response) => {
  const data: LoginBody = req.body;

  if (!data.email.trim() || !data.password)
    throw new Error("Error: Invalid data");

  // Find the user with the email
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    res.sendStatus(400).json({ success: false, message: "No user found" });
    return;
  }


  console.log(data);
};

const registerHandler = async (req: Request, res: Response) => {
  try {
    const data: LoginBody = req.body;

    if (!data.email.trim() || !data.password)
      throw new Error("Error: Invalid data");

    // Find if the user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      res
        .sendStatus(400)
        .json({ success: false, message: "User already exists" });

      return;
    }

    const salt = await genSalt(14);
    const hashedPassword = await hash(data.password, salt);

    // Save the password in the database along with salt
    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        salt: salt,
      },
    });

    res.sendStatus(200).json({ success: true, message: "User registered" });
  } catch (error) {
    res.sendStatus(500).json({ success: false, message: error.message });
  }
};

export { loginHandler, registerHandler };
