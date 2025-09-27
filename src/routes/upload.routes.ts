import { Router } from "express";
import multer from "multer";
import { cloudinary } from "../utils/cloudinary.ts";
import { type UserRequest } from "../utils/middlewares/jwt.ts";
import { prisma } from "../utils/db.ts";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/files", async (req: any, res) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
      },
    });

    console.log(`Files for ${req.user.id}: `, files);

    res.json({
      success: true,
      message: "Files retrieved successfully",
      data: files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", upload.single("file"), async (req: any, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    const file = await prisma.file.create({
      data: {
        userId: req.user.id,
        name: req.file.originalname,
        url: result.secure_url,
      },
    });

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router };
