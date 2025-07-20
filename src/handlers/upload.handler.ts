import { Request, Response } from "express";

const uploadHandler = async (req: Request, res: Response) => {
  console.log("Session: ", req.session);
  console.log("Upload", req.body);

  res.status(200).json({ success: true, message: "Uploaded" });
};

export { uploadHandler };
