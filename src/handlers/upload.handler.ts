import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../utils/db";

cloudinary.config({
  secure: true,
});

const uploadHandler = async (req: Request, res: Response) => {
  try {
    if(!req.session.userId) throw new Error("Unauthorized")
    if (!req.file) throw new Error("No file was provided");

  console.log(req.session.userId)

    // Upload it to some cloud storage
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);
    console.log("Upload result: ", result);

    // Save the URL in the DB

    await prisma.file.create({
      data: {
        authorId: 3,
        name: req.file.filename,
        url: result.url,
      },
    });

    res.json({
      success: true,
      message: "File uploaded",
    });
  } catch (error) {
    console.log("Upload error: ", error);

    res.status(500).json({
      success: false,
      message: "Error uploading the file",
    });
  }
};

export { uploadHandler };
