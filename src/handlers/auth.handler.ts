import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { prisma } from "../utils/db";

declare module "express-session" {
  interface SessionData {
    userId: number;
    email: string;
  }
}

type LoginBody = {
  email: string;
  password: string;
};

const meHandler = async (req: Request, res: Response) => {
  console.log("Reqest session: ", req.session);

  try {
    if (!req.session.userId || !req.session.email) {
      res.status(401).json({ success: true, message: "Not authorized" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User found",
      user: {
        id: req.session.userId,
        email: req.session.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginHandler = async (req: Request, res: Response) => {
  try {
    if (req.session.userId) {
      res
        .status(400)
        .json({ success: false, message: "You're already logged in" });

      return;
    }

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
      res.status(400).json({ success: false, message: "No user found" });
      return;
    }

    const isPasswordCorrect = await compare(data.password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Your email or password is incorrect",
      });
      return;
    }

    // Create a session and store it
    req.session.userId = user.id;
    req.session.email = user.email;

    res.status(200).json({
      success: true,
      message: "Logged in",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
      res.status(400).json({ success: false, message: "User already exists" });

      return;
    }

    const salt = await genSalt(14);
    const hashedPassword = await hash(data.password, salt);

    // Save the password in the database along with salt
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        salt: salt,
      },
    });

    // Log the user in
    req.session.userId = user.id;
    req.session.email = user.email;

    res.status(200).json({
      success: true,
      message: "User registered",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logoutHandler = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Could not log out" });
      }
    });

    res.clearCookie("connect.sid");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {

    res.status(500).json({ success: false, message: error.message });
  }
};

export { meHandler, loginHandler, registerHandler, logoutHandler };
