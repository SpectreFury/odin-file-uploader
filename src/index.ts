import "dotenv/config";

import express from "express";
import cors from "cors";
import session from "express-session";
import multer from 'multer'

const app = express();

import { authRouter } from "./routes/auth.route.ts";
import { uploadRouter } from "./routes/upload.route.ts";
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    cookie: {
      secure: process.env.NODE_ENV! === "production" ? true : false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
    resave: true,
    saveUninitialized: false,
  }),
);

app.use("/auth", authRouter);
app.use('/upload', uploadRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
