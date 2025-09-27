import "dotenv/config";

import { Router } from "express";
import { prisma } from "../utils/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = Router();

type SignupBody = {
  email: string;
  password: string;
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("All fields are required");

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (!existingUser) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      existingUser.password,
    );

    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.log("Login error: ", error);

    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password }: SignupBody = req.body;
    if (!email || !password) throw new Error("All inputs are required");

    if (!email.trim() || !password.trim()) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });

      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });

      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        password: hashedPassword,
      },
    });

    const tokenData = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenData, process.env.SECRET_KEY as string);

    res.status(201).json({
      success: true,
      message: "Sign up successful",
      data: {
        accessToken,
        id: user.id,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.log("Signup error: ", err);

    return res.status(500).json({
      success: false,
      message: err.message(),
    });
  }
});
