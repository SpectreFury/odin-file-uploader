import "dotenv/config";

const PORT = process.env.PORT || 3000;

import express from "express";
const app = express();

import cors from "cors";

import { router as authRouter } from "./routes/auth.routes.ts";
import { logger } from "./utils/logger.ts";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
