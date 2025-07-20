import { Router } from "express";
import { uploadHandler } from "../handlers/upload.handler";

const uploadRouter = Router()

uploadRouter.post("/", uploadHandler)

export {uploadRouter}
