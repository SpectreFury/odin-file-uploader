import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type User = {
  id: string;
};

export interface UserRequest extends Request {
  user: User;
}

const verifyJWT = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    console.log("Decoded: ", decoded);

    req.user = decoded as User;
    next();
  } catch (error) {
    console.log("Error verifying JWT:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { verifyJWT };
