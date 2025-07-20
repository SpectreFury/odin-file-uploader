import { Request, Response } from "express";

const uploadHandler = async (req: Request, res: Response) => {
  console.log("File: ", req.file);

  res.status(200).json({ success: true, message: "Uploaded" });
};

export { uploadHandler };
