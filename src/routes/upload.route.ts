import { Router } from "express";
import { uploadHandler } from "../handlers/upload.handler";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), uploadHandler);

export { uploadRouter };
